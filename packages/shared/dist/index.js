"use strict";
/**
 * Punto de entrada público del paquete @secop/shared
 * Exporta todo lo que backend y frontend necesitan
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeSoql = exports.sanitizeSearchTerm = exports.isValidLimit = exports.isPositiveNumber = exports.isValidDate = exports.parseNumberSafe = exports.truncateText = exports.formatDateShort = exports.formatDate = exports.formatCurrency = exports.getDefaultConfig = exports.validateConfig = exports.aggregateByEntity = exports.getProcessDetails = exports.transformProcess = exports.searchProcesses = exports.SoQLQueryBuilder = exports.SocrataClient = void 0;
// Clientes y utilidades
var client_js_1 = require("./api/client.js");
Object.defineProperty(exports, "SocrataClient", { enumerable: true, get: function () { return client_js_1.SocrataClient; } });
var queries_js_1 = require("./api/queries.js");
Object.defineProperty(exports, "SoQLQueryBuilder", { enumerable: true, get: function () { return queries_js_1.SoQLQueryBuilder; } });
// Tools (lógica de negocio)
var search_js_1 = require("./tools/search.js");
Object.defineProperty(exports, "searchProcesses", { enumerable: true, get: function () { return search_js_1.searchProcesses; } });
Object.defineProperty(exports, "transformProcess", { enumerable: true, get: function () { return search_js_1.transformProcess; } });
var details_js_1 = require("./tools/details.js");
Object.defineProperty(exports, "getProcessDetails", { enumerable: true, get: function () { return details_js_1.getProcessDetails; } });
var aggregate_js_1 = require("./tools/aggregate.js");
Object.defineProperty(exports, "aggregateByEntity", { enumerable: true, get: function () { return aggregate_js_1.aggregateByEntity; } });
// Configuración
var config_js_1 = require("./config.js");
Object.defineProperty(exports, "validateConfig", { enumerable: true, get: function () { return config_js_1.validateConfig; } });
Object.defineProperty(exports, "getDefaultConfig", { enumerable: true, get: function () { return config_js_1.getDefaultConfig; } });
// Utilidades
var formatters_js_1 = require("./utils/formatters.js");
Object.defineProperty(exports, "formatCurrency", { enumerable: true, get: function () { return formatters_js_1.formatCurrency; } });
Object.defineProperty(exports, "formatDate", { enumerable: true, get: function () { return formatters_js_1.formatDate; } });
Object.defineProperty(exports, "formatDateShort", { enumerable: true, get: function () { return formatters_js_1.formatDateShort; } });
Object.defineProperty(exports, "truncateText", { enumerable: true, get: function () { return formatters_js_1.truncateText; } });
Object.defineProperty(exports, "parseNumberSafe", { enumerable: true, get: function () { return formatters_js_1.parseNumberSafe; } });
var validators_js_1 = require("./utils/validators.js");
Object.defineProperty(exports, "isValidDate", { enumerable: true, get: function () { return validators_js_1.isValidDate; } });
Object.defineProperty(exports, "isPositiveNumber", { enumerable: true, get: function () { return validators_js_1.isPositiveNumber; } });
Object.defineProperty(exports, "isValidLimit", { enumerable: true, get: function () { return validators_js_1.isValidLimit; } });
Object.defineProperty(exports, "sanitizeSearchTerm", { enumerable: true, get: function () { return validators_js_1.sanitizeSearchTerm; } });
Object.defineProperty(exports, "escapeSoql", { enumerable: true, get: function () { return validators_js_1.escapeSoql; } });
//# sourceMappingURL=index.js.map