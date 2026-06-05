/**
 * Utilidades de formateo para toda la aplicación
 * Tanto backend como frontend usan las mismas funciones
 */
/**
 * Formatea un número como moneda colombiana (COP)
 * @param value - Número a formatear
 * @returns String formateado ej: "$ 1.234.567"
 */
export declare function formatCurrency(value: number): string;
/**
 * Formatea una fecha ISO a formato local colombiano
 * @param dateString - Fecha en formato ISO (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss)
 * @returns String formateado ej: "15 de enero de 2024"
 */
export declare function formatDate(dateString: string): string;
/**
 * Formatea una fecha ISO a formato corto (YYYY-MM-DD)
 * @param dateString - Fecha en formato ISO
 * @returns String formateado ej: "2024-01-15"
 */
export declare function formatDateShort(dateString: string): string;
/**
 * Acorta un texto a una longitud máxima
 * @param text - Texto a acortar
 * @param maxLength - Longitud máxima (default: 100)
 * @returns Texto acortado con "..." si es necesario
 */
export declare function truncateText(text: string, maxLength?: number): string;
/**
 * Parsea un string a número de forma segura
 * @param value - Valor a parsear (string o number)
 * @returns Número o 0 si no se puede parsear
 */
export declare function parseNumberSafe(value: string | number | undefined | null): number;
//# sourceMappingURL=formatters.d.ts.map