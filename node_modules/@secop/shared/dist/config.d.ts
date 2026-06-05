/**
 * Configuración del cliente Socrata
 * A diferencia del MCP server original, esto NO lee .env directamente
 * Recibe la configuración por parámetro para ser agnóstico del entorno
 */
import { SocrataClientConfig } from './api/types.js';
/**
 * Valida que la configuración tenga los campos requeridos
 */
export declare function validateConfig(config: Partial<SocrataClientConfig>): SocrataClientConfig;
/**
 * Crea una configuración por defecto (útil para testing)
 */
export declare function getDefaultConfig(): SocrataClientConfig;
//# sourceMappingURL=config.d.ts.map