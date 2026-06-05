/**
 * Cliente HTTP para la API de Socrata (datos.gov.co)
 */
export interface SocrataClientConfig {
    SOCRATA_APP_TOKEN: string;
    SOCRATA_BASE_URL: string;
    SOCRATA_DATASET_ID: string;
    REQUEST_TIMEOUT_MS: number;
    RETRY_ATTEMPTS: number;
    SOCRATA_API_KEY?: string;
    SOCRATA_API_SECRET?: string;
}
export declare class SocrataClient {
    private client;
    private config;
    constructor(config: SocrataClientConfig);
    private setupInterceptors;
    private shouldRetry;
    private transformError;
    query<T = Record<string, unknown>>(params: Record<string, string | number>): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map