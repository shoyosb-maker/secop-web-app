"use strict";
/**
 * Herramienta de agregación (estadísticas por entidad)
 * Lógica pura - calcula estadísticas a partir de los datos
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateByEntity = aggregateByEntity;
const queries_js_1 = require("../api/queries.js");
const formatters_js_1 = require("../utils/formatters.js");
const validators_js_1 = require("../utils/validators.js");
/**
 * Agrega estadísticas por entidad
 */
async function aggregateByEntity(client, params) {
    const queryBuilder = new queries_js_1.SoQLQueryBuilder();
    const query = queryBuilder.buildAggregateQuery(params.entity_nit, params.from_date, params.to_date);
    const results = await client.query(query);
    // Obtener nombre de la entidad
    const entityDetails = await client.query({
        $where: `nit_entidad = '${(0, validators_js_1.escapeSoql)(params.entity_nit)}'`,
        $limit: 1,
        $select: 'entidad, nit_entidad',
    });
    const entityName = entityDetails.length > 0 ? entityDetails[0].entidad : 'Desconocida';
    // Procesar resultados
    let totalProcesses = 0;
    let totalValue = 0;
    const byPhase = {};
    const byModality = {};
    for (const row of results) {
        const count = Number(row.count) || 0;
        const value = Number(row.total_value) || 0;
        totalProcesses += count;
        totalValue += value;
        if (row.fase) {
            byPhase[row.fase] = (byPhase[row.fase] || 0) + count;
        }
        if (row.modalidad_de_contratacion) {
            byModality[row.modalidad_de_contratacion] = (byModality[row.modalidad_de_contratacion] || 0) + count;
        }
    }
    // Generar insights
    const insights = generateInsights(entityName, totalProcesses, totalValue, byModality);
    // Generar tabla markdown
    const summaryTable = formatSummaryTable(entityName, totalProcesses, totalValue, byModality);
    return {
        _meta: {
            tool: 'aggregate_by_entity',
            timestamp: new Date().toISOString(),
            entity: entityName,
            nit: params.entity_nit,
        },
        data: {
            summary_table: summaryTable,
            insights,
            by_phase: byPhase,
            by_modality: byModality,
            total_processes: totalProcesses,
            total_value: totalValue,
        },
    };
}
function generateInsights(entityName, totalCount, totalValue, byModality) {
    const insights = [];
    const formattedValue = (0, formatters_js_1.formatCurrency)(totalValue);
    insights.push(`La entidad **${entityName}** ha gestionado un total de **${totalCount} procesos** con un valor acumulado de **${formattedValue}**.`);
    // Modalidad dominante
    let maxModality = '';
    let maxCount = 0;
    for (const [modality, count] of Object.entries(byModality)) {
        if (count > maxCount) {
            maxCount = count;
            maxModality = modality;
        }
    }
    if (maxModality && totalCount > 0) {
        const percent = ((maxCount / totalCount) * 100).toFixed(0);
        insights.push(`La modalidad dominante es **${maxModality}**, representando el **${percent}%** de los procesos.`);
    }
    return insights;
}
function formatSummaryTable(entityName, totalCount, totalValue, byModality) {
    const formattedValue = (0, formatters_js_1.formatCurrency)(totalValue);
    // Encontrar modalidad principal
    let maxModality = 'N/A';
    let maxCount = 0;
    for (const [modality, count] of Object.entries(byModality)) {
        if (count > maxCount) {
            maxCount = count;
            maxModality = modality;
        }
    }
    let md = '| Entidad | Total Procesos | Valor Total | Modalidad Principal |\n';
    md += '|:---|:---:|:---:|:---|\n';
    md += `| ${entityName} | ${totalCount} | ${formattedValue} | ${maxModality} |\n`;
    return md;
}
//# sourceMappingURL=aggregate.js.map