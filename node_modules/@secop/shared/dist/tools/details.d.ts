/**
 * Herramienta de detalles de proceso
 * Lógica pura - obtiene información completa de un proceso
 */
import { SocrataClient } from '../api/client.js';
import { ResponseMeta } from '../api/types.js';
export interface DetailsResult {
    _meta: ResponseMeta;
    data: Record<string, unknown>;
}
/**
 * Obtiene detalles completos de un proceso
 */
export declare function getProcessDetails(client: SocrataClient, processId: string): Promise<DetailsResult>;
//# sourceMappingURL=details.d.ts.map