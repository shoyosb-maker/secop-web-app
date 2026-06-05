/**
 * Herramienta de búsqueda de procesos
 * Lógica pura - no depende de MCP, solo de tipos
 */

import { SocrataClient } from '../api/client.js';
import { SoQLQueryBuilder } from '../api/queries.js';
import { SecopProcess, TransformedProcess, SearchParams, ResponseMeta } from '../api/types.js';
import { parseNumberSafe, truncateText } from '../utils/formatters.js';

export interface SearchResult {
  _meta: ResponseMeta;
  data: TransformedProcess[];
}

/**
 * Transforma un proceso crudo de la API a formato amigable
 */
export function transformProcess(raw: SecopProcess): TransformedProcess {
  return {
    id: raw.id_del_proceso || '',
    reference: raw.referencia_del_proceso || '',
    entity: raw.entidad || 'Entidad no especificada',
    entity_nit: raw.nit_entidad || '',
    title: truncateText(raw.nombre_del_procedimiento || 'Sin título', 80),
    phase: raw.fase || 'No especificada',
    status: raw.estado_del_procedimiento || 'No especificado',
    modality: raw.modalidad_de_contratacion || 'No especificada',
    base_value: parseNumberSafe(raw.precio_base),
    publication_date: raw.fecha_de_publicacion_del || '',
    deadline: raw.fecha_de_recepcion_de || '',
    url: raw.urlproceso || '',
    description: truncateText(raw.descripci_n_del_procedimiento || '', 150),
    unspsc_code: raw.codigo_principal_de_categoria || '',
    unspsc_additional: raw.categorias_adicionales || '',
  };
}

/**
 * Busca procesos de contratación
 */
export async function searchProcesses(
  client: SocrataClient,
  params: SearchParams
): Promise<SearchResult> {
  const queryBuilder = new SoQLQueryBuilder();
  const query = queryBuilder.buildSearchQuery(params);
  
  const rawProcesses = await client.query<SecopProcess[]>(query);
  
  const transformedProcesses = rawProcesses.map(transformProcess);
  
  // Si hay límite, aplicar (aunque la API ya lo hace, por seguridad)
  const limit = params.limit || 50;
  const data = transformedProcesses.slice(0, limit);

  return {
    _meta: {
      tool: 'search_processes',
      timestamp: new Date().toISOString(),
      count: data.length,
      total_fetched: rawProcesses.length,
      limit: limit,
      note: params.query ? `Búsqueda: "${params.query}"` : undefined,
    },
    data,
  };
}