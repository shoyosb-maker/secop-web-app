/**
 * Herramienta de detalles de proceso
 * Lógica pura - obtiene información completa de un proceso
 */

import { SocrataClient } from '../api/client.js';
import { SecopProcess, ResponseMeta } from '../api/types.js';
import { parseNumberSafe, formatDateShort } from '../utils/formatters.js';
import { escapeSoql } from '../utils/validators.js';

export interface DetailsResult {
  _meta: ResponseMeta;
  data: Record<string, unknown>;
}

/**
 * Limpia un objeto eliminando valores vacíos
 */
function cleanObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || value === '') {
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const cleaned = cleanObject(value as Record<string, unknown>);
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned;
      }
    } else {
      result[key] = value;
    }
  }

  return result as Partial<T>;
}

/**
 * Obtiene detalles completos de un proceso
 */
export async function getProcessDetails(
  client: SocrataClient,
  processId: string
): Promise<DetailsResult> {
  // Buscar por ID primero
  let processes = await client.query<SecopProcess[]>({
    $where: `id_del_proceso = '${escapeSoql(processId)}'`,
    $limit: 1,
  });

  // Si no se encuentra, buscar por referencia
  if (processes.length === 0) {
    processes = await client.query<SecopProcess[]>({
      $where: `referencia_del_proceso = '${escapeSoql(processId)}'`,
      $limit: 1,
    });
  }

  if (processes.length === 0) {
    throw new Error(`Process not found with ID or Reference: ${processId}`);
  }

  const raw = processes[0];

  // Construir objeto semántico con la información del proceso
  const data = cleanObject({
    identity: {
      process_id: raw.id_del_proceso,
      reference_number: raw.referencia_del_proceso,
      portfolio_id: raw.id_del_portafolio,
      url: raw.urlproceso,
    },
    context: {
      title: raw.nombre_del_procedimiento,
      description: raw.descripci_n_del_procedimiento,
      justification: raw.justificaci_n_modalidad_de,
      unspsc_code: raw.codigo_principal_de_categoria,
      additional_unspsc: raw.categorias_adicionales,
      lots_count: raw.numero_de_lotes ? parseNumberSafe(raw.numero_de_lotes) : undefined,
    },
    buyer: {
      name: raw.entidad,
      nit: raw.nit_entidad,
      code: raw.codigo_entidad,
      order: raw.ordenentidad,
      location: {
        department: raw.departamento_entidad,
        city: raw.ciudad_entidad,
        address: raw.direccion_entidad,
      },
      contracting_unit: {
        name: raw.nombre_de_la_unidad_de,
        city: raw.ciudad_de_la_unidad_de,
      },
    },
    economics: {
      base_budget: {
        amount: parseNumberSafe(raw.precio_base),
        currency: 'COP',
      },
      payment_terms: raw.condiciones_de_pago,
    },
    timeline: {
      status: raw.estado_del_procedimiento,
      phase: raw.fase,
      published_at: raw.fecha_de_publicacion_del,
      last_published_at: raw.fecha_de_ultima_publicaci,
      submission_deadline: raw.fecha_de_recepcion_de,
      scheduled_opening: raw.fecha_de_apertura_de_respuesta,
      actual_opening: raw.fecha_de_apertura_efectiva,
      duration: raw.duracion ? {
        value: parseNumberSafe(raw.duracion),
        unit: raw.unidad_de_duracion,
      } : undefined,
    },
    legal: {
      contract_type: raw.tipo_de_contrato,
      contract_subtype: raw.subtipo_de_contrato,
      selection_mode: raw.modalidad_de_contratacion,
    },
    participation: {
      invited_suppliers: raw.proveedores_invitados ? parseNumberSafe(raw.proveedores_invitados) : undefined,
      views: raw.visualizaciones_del ? parseNumberSafe(raw.visualizaciones_del) : undefined,
      interested_suppliers: raw.proveedores_que_manifestaron ? parseNumberSafe(raw.proveedores_que_manifestaron) : undefined,
      total_responses: raw.respuestas_al_procedimiento ? parseNumberSafe(raw.respuestas_al_procedimiento) : undefined,
    },
    award: raw.adjudicado === 'Si' ? {
      awarded: true,
      award_date: raw.fecha_adjudicacion,
      total_value: parseNumberSafe(raw.valor_total_adjudicacion),
      awarded_by: raw.nombre_del_adjudicador,
      winner: {
        name: raw.nombre_del_proveedor,
        nit: raw.nit_del_proveedor_adjudicado,
        code: raw.codigoproveedor,
        location: {
          department: raw.departamento_proveedor,
          city: raw.ciudad_proveedor,
        },
      },
    } : undefined,
  });

  return {
    _meta: {
      tool: 'get_process_details',
      timestamp: new Date().toISOString(),
      process_id: processId,
    },
    data,
  };
}