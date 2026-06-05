"use strict";
/**
 * Herramienta de búsqueda de procesos
 * Lógica pura - no depende de MCP, solo de tipos
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformProcess = transformProcess;
exports.searchProcesses = searchProcesses;
const queries_js_1 = require("../api/queries.js");
const formatters_js_1 = require("../utils/formatters.js");
/**
 * Transforma un proceso crudo de la API a formato amigable
 */
function transformProcess(raw) {
    return {
        id: raw.id_del_proceso || '',
        reference: raw.referencia_del_proceso || '',
        entity: raw.entidad || 'Entidad no especificada',
        entity_nit: raw.nit_entidad || '',
        title: (0, formatters_js_1.truncateText)(raw.nombre_del_procedimiento || 'Sin título', 80),
        phase: raw.fase || 'No especificada',
        status: raw.estado_del_procedimiento || 'No especificado',
        modality: raw.modalidad_de_contratacion || 'No especificada',
        base_value: (0, formatters_js_1.parseNumberSafe)(raw.precio_base),
        publication_date: raw.fecha_de_publicacion_del || '',
        deadline: raw.fecha_de_recepcion_de || '',
        url: raw.urlproceso || '',
        description: (0, formatters_js_1.truncateText)(raw.descripci_n_del_procedimiento || '', 150),
        unspsc_code: raw.codigo_principal_de_categoria || '',
        unspsc_additional: raw.categorias_adicionales || '',
    };
}
/**
 * Busca procesos de contratación
 */
async function searchProcesses(client, params) {
    const queryBuilder = new queries_js_1.SoQLQueryBuilder();
    const query = queryBuilder.buildSearchQuery(params);
    const rawProcesses = await client.query(query);
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
//# sourceMappingURL=search.js.map