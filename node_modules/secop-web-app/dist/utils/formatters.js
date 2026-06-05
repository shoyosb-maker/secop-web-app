"use strict";
/**
 * Utilidades de formateo para toda la aplicación
 * Tanto backend como frontend usan las mismas funciones
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatDateShort = formatDateShort;
exports.truncateText = truncateText;
exports.parseNumberSafe = parseNumberSafe;
/**
 * Formatea un número como moneda colombiana (COP)
 * @param value - Número a formatear
 * @returns String formateado ej: "$ 1.234.567"
 */
function formatCurrency(value) {
    if (isNaN(value) || value === 0) {
        return '$ 0';
    }
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}
/**
 * Formatea una fecha ISO a formato local colombiano
 * @param dateString - Fecha en formato ISO (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss)
 * @returns String formateado ej: "15 de enero de 2024"
 */
function formatDate(dateString) {
    if (!dateString)
        return 'Fecha no disponible';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime()))
            return 'Fecha inválida';
        return date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    catch {
        return 'Fecha inválida';
    }
}
/**
 * Formatea una fecha ISO a formato corto (YYYY-MM-DD)
 * @param dateString - Fecha en formato ISO
 * @returns String formateado ej: "2024-01-15"
 */
function formatDateShort(dateString) {
    if (!dateString)
        return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime()))
            return '';
        return date.toISOString().split('T')[0];
    }
    catch {
        return '';
    }
}
/**
 * Acorta un texto a una longitud máxima
 * @param text - Texto a acortar
 * @param maxLength - Longitud máxima (default: 100)
 * @returns Texto acortado con "..." si es necesario
 */
function truncateText(text, maxLength = 100) {
    if (!text)
        return '';
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength - 3) + '...';
}
/**
 * Parsea un string a número de forma segura
 * @param value - Valor a parsear (string o number)
 * @returns Número o 0 si no se puede parsear
 */
function parseNumberSafe(value) {
    if (value === undefined || value === null)
        return 0;
    if (typeof value === 'number')
        return isNaN(value) ? 0 : value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}
//# sourceMappingURL=formatters.js.map