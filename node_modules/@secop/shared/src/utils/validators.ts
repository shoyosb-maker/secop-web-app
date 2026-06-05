/**
 * Utilidades de validación
 */

export function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

export function isValidLimit(limit: number): boolean {
  return limit >= 1 && limit <= 200;
}

export function sanitizeSearchTerm(term: string): string {
  if (!term) return '';
  return term.trim().toUpperCase().replace(/\s+/g, ' ');
}

export function escapeSoql(str: string): string {
  if (!str) return '';
  return str.replace(/'/g, "''");
}