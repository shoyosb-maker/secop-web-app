/**
 * Herramienta de búsqueda de procesos
 * Lógica pura - no depende de MCP, solo de tipos
 */
import { SocrataClient } from '../api/client.js';
import { SecopProcess, TransformedProcess, SearchParams, ResponseMeta } from '../api/types.js';
export interface SearchResult {
    _meta: ResponseMeta;
    data: TransformedProcess[];
}
/**
 * Transforma un proceso crudo de la API a formato amigable
 */
export declare function transformProcess(raw: SecopProcess): TransformedProcess;
/**
 * Busca procesos de contratación
 */
export declare function searchProcesses(client: SocrataClient, params: SearchParams): Promise<SearchResult>;
//# sourceMappingURL=search.d.ts.map