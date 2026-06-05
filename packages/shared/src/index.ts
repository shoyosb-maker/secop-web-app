/**
 * Punto de entrada público del paquete @secop/shared
 * Exporta todo lo que backend y frontend necesitan
 */

// Clientes y utilidades
export { SocrataClient } from './api/client.js';
export { SoQLQueryBuilder } from './api/queries.js';

// Tools (lógica de negocio)
export { searchProcesses, transformProcess } from './tools/search.js';
export { getProcessDetails } from './tools/details.js';
export { aggregateByEntity } from './tools/aggregate.js';
export type { AggregateParams } from './tools/aggregate.js';

// Tipos compartidos
export type {
  SecopProcess,
  TransformedProcess,
  SearchParams,
  AggregationResult,
  ResponseMeta,
  SocrataClientConfig,
} from './api/types.js';

// Configuración
export { validateConfig, getDefaultConfig } from './config.js';

// Utilidades
export {
  formatCurrency,
  formatDate,
  formatDateShort,
  truncateText,
  parseNumberSafe,
} from './utils/formatters.js';

export {
  isValidDate,
  isPositiveNumber,
  isValidLimit,
  sanitizeSearchTerm,
  escapeSoql,
} from './utils/validators.js';