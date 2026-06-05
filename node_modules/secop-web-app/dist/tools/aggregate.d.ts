/**
 * Herramienta de agregación (estadísticas por entidad)
 * Lógica pura - calcula estadísticas a partir de los datos
 */
import { SocrataClient } from '../api/client.js';
import { ResponseMeta } from '../api/types.js';
export interface AggregateResult {
    _meta: ResponseMeta;
    data: {
        summary_table: string;
        insights: string[];
        by_phase: Record<string, number>;
        by_modality: Record<string, number>;
        total_processes: number;
        total_value: number;
    };
}
export interface AggregateParams {
    entity_nit: string;
    from_date?: string;
    to_date?: string;
}
/**
 * Agrega estadísticas por entidad
 */
export declare function aggregateByEntity(client: SocrataClient, params: AggregateParams): Promise<AggregateResult>;
//# sourceMappingURL=aggregate.d.ts.map