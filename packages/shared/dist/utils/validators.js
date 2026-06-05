"use strict";
/**
 * Utilidades de validación
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = isValidDate;
exports.isPositiveNumber = isPositiveNumber;
exports.isValidLimit = isValidLimit;
exports.sanitizeSearchTerm = sanitizeSearchTerm;
exports.escapeSoql = escapeSoql;
function isValidDate(dateString) {
    if (!dateString)
        return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString))
        return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}
function isPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && value > 0;
}
function isValidLimit(limit) {
    return limit >= 1 && limit <= 200;
}
function sanitizeSearchTerm(term) {
    if (!term)
        return '';
    return term.trim().toUpperCase().replace(/\s+/g, ' ');
}
function escapeSoql(str) {
    if (!str)
        return '';
    return str.replace(/'/g, "''");
}
//# sourceMappingURL=validators.js.map