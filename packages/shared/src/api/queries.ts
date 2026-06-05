/**
 * Constructor de consultas SoQL (Socrata Query Language)
 */

import { SearchParams } from './types.js';
import { escapeSoql } from '../utils/validators.js';

export class SoQLQueryBuilder {
  /**
   * Construye una consulta de búsqueda a partir de parámetros
   */
  buildSearchQuery(params: SearchParams): Record<string, string | number> {
    const whereClauses: string[] = [];

    // Búsqueda por texto libre (título o descripción)
    if (params.query) {
      const mode = params.search_mode || 'all_words';

      if (mode === 'phrase') {
        const q = escapeSoql(params.query.toUpperCase());
        whereClauses.push(`(upper(descripci_n_del_procedimiento) LIKE '%${q}%' OR upper(nombre_del_procedimiento) LIKE '%${q}%')`);
      } else {
        const words = params.query.trim().split(/\s+/).filter(w => w.length > 0);

        if (words.length > 0) {
          const wordConditions = words.map(word => {
            const q = escapeSoql(word.toUpperCase());
            return `(upper(descripci_n_del_procedimiento) LIKE '%${q}%' OR upper(nombre_del_procedimiento) LIKE '%${q}%')`;
          });

          const operator = mode === 'all_words' ? ' AND ' : ' OR ';
          whereClauses.push(`(${wordConditions.join(operator)})`);
        }
      }
    }

    // Filtros básicos
    if (params.entity_name) {
      whereClauses.push(`entidad LIKE '%${escapeSoql(params.entity_name.toUpperCase())}%'`);
    }

    if (params.department) {
      whereClauses.push(`departamento_entidad = '${escapeSoql(params.department)}'`);
    }

    if (params.city) {
      whereClauses.push(`ciudad_entidad = '${escapeSoql(params.city)}'`);
    }

    if (params.phase) {
      whereClauses.push(`fase = '${escapeSoql(params.phase)}'`);
    }

    if (params.modality) {
      whereClauses.push(`modalidad_de_contratacion = '${escapeSoql(params.modality)}'`);
    }

    if (params.status) {
      whereClauses.push(`estado_del_procedimiento = '${escapeSoql(params.status)}'`);
    }

    if (params.min_value !== undefined) {
      whereClauses.push(`precio_base >= ${params.min_value}`);
    }

    if (params.max_value !== undefined) {
      whereClauses.push(`precio_base <= ${params.max_value}`);
    }

    if (params.from_date) {
      whereClauses.push(`fecha_de_publicacion_del >= '${escapeSoql(params.from_date)}'`);
    }

    if (params.to_date) {
      whereClauses.push(`fecha_de_publicacion_del <= '${escapeSoql(params.to_date)}'`);
    }

    // Construir consulta con $select explícito para incluir todos los campos necesarios
    const query: Record<string, string | number> = {
      $limit: params.limit || 50,
      $order: 'fecha_de_publicacion_del DESC',
      $select: 'id_del_proceso, referencia_del_proceso, entidad, nit_entidad, nombre_del_procedimiento, descripci_n_del_procedimiento, fase, estado_del_procedimiento, modalidad_de_contratacion, precio_base, fecha_de_publicacion_del, fecha_de_recepcion_de, urlproceso, codigo_principal_de_categoria, categorias_adicionales',
    };

    if (whereClauses.length > 0) {
      query.$where = whereClauses.join(' AND ');
    }

    return query;
  }

  /**
   * Construye una consulta de agregación (estadísticas por entidad)
   */
  buildAggregateQuery(entityNit: string, fromDate?: string, toDate?: string): Record<string, string> {
    const whereClauses: string[] = [`nit_entidad = '${escapeSoql(entityNit)}'`];

    if (fromDate) {
      whereClauses.push(`fecha_de_publicacion_del >= '${escapeSoql(fromDate)}'`);
    }

    if (toDate) {
      whereClauses.push(`fecha_de_publicacion_del <= '${escapeSoql(toDate)}'`);
    }

    return {
      $select: 'fase, modalidad_de_contratacion, count(*) as count, sum(precio_base) as total_value',
      $where: whereClauses.join(' AND '),
      $group: 'fase, modalidad_de_contratacion',
    };
  }
}