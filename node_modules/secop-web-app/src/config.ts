/**
 * Configuración del cliente Socrata
 * A diferencia del MCP server original, esto NO lee .env directamente
 * Recibe la configuración por parámetro para ser agnóstico del entorno
 */

import { SocrataClientConfig } from './api/types.js';

/**
 * Valida que la configuración tenga los campos requeridos
 */
export function validateConfig(config: Partial<SocrataClientConfig>): SocrataClientConfig {
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
export function getDefaultConfig(): SocrataClientConfig {
  return {
    SOCRATA_APP_TOKEN: '',
    SOCRATA_BASE_URL: 'https://www.datos.gov.co',
    SOCRATA_DATASET_ID: 'p6dx-8zbt',
    REQUEST_TIMEOUT_MS: 30000,
    RETRY_ATTEMPTS: 3,
  };
}