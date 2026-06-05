/**
 * Constructor de consultas SoQL (Socrata Query Language)
 */
import { SearchParams } from './types.js';
export declare class SoQLQueryBuilder {
    /**
     * Construye una consulta de búsqueda a partir de parámetros
     */
    buildSearchQuery(params: SearchParams): Record<string, string | number>;
    /**
     * Construye una consulta de agregación (estadísticas por entidad)
     */
    buildAggregateQuery(entityNit: string, fromDate?: string, toDate?: string): Record<string, string>;
}
//# sourceMappingURL=queries.d.ts.map