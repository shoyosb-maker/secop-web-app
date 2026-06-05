"use strict";
/**
 * Configuración del cliente Socrata
 * A diferencia del MCP server original, esto NO lee .env directamente
 * Recibe la configuración por parámetro para ser agnóstico del entorno
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
exports.getDefaultConfig = getDefaultConfig;
/**
 * Valida que la configuración tenga los campos requeridos
 */
function validateConfig(config) {
    if (!config.SOCRATA_APP_TOKEN) {
        throw new Error('SOCRATA_APP_TOKEN es requerido');
    }
    return {
        SOCRATA_APP_TOKEN: config.SOCRATA_APP_TOKEN,
        SOCRATA_BASE_URL: config.SOCRATA_BASE_URL || 'https://www.datos.gov.co',
        SOCRATA_DATASET_ID: config.SOCRATA_DATASET_ID || 'p6dx-8zbt',
        REQUEST_TIMEOUT_MS: config.REQUEST_TIMEOUT_MS || 30000,
        RETRY_ATTEMPTS: config.RETRY_ATTEMPTS || 3,
        SOCRATA_API_KEY: config.SOCRATA_API_KEY,
        SOCRATA_API_SECRET: config.SOCRATA_API_SECRET,
    };
}
/**
 * Crea una configuración por defecto (útil para testing)
 */
function getDefaultConfig() {
    return {
        SOCRATA_APP_TOKEN: '',
        SOCRATA_BASE_URL: 'https://www.datos.gov.co',
        SOCRATA_DATASET_ID: 'p6dx-8zbt',
        REQUEST_TIMEOUT_MS: 30000,
        RETRY_ATTEMPTS: 3,
    };
}
//# sourceMappingURL=config.js.map