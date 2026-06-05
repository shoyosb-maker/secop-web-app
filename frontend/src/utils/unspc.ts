// frontend/src/utils/unspc.ts

export const cleanUnspcCode = (code: string): string => {
  let cleaned = code.trim().toUpperCase();
  cleaned = cleaned.replace(/^[A-Z0-9]+\./, '');
  cleaned = cleaned.replace(/^[A-Z0-9]+-/, '');
  cleaned = cleaned.replace(/[^\d]/g, '');
  return cleaned;
};

export const isValidUnspc = (code: string): boolean => {
  const cleanCode = cleanUnspcCode(code);
  return /^\d{8}$/.test(cleanCode);
};

export const getAllUnspcCodes = (
  unspsc_code?: string, 
  unspsc_additional?: string
): string[] => {
  const codes: string[] = [];
  
  if (unspsc_code && unspsc_code !== 'No definido' && unspsc_code !== '') {
    if (isValidUnspc(unspsc_code)) {
      const cleaned = cleanUnspcCode(unspsc_code);
      if (!codes.includes(cleaned)) codes.push(cleaned);
    }
  }
  
  if (unspsc_additional && unspsc_additional !== 'No definido' && unspsc_additional !== '') {
    const additionalCodes = unspsc_additional.split(',').map(c => c.trim());
    for (const code of additionalCodes) {
      if (code && code !== 'No definido' && isValidUnspc(code)) {
        const cleaned = cleanUnspcCode(code);
        if (!codes.includes(cleaned)) codes.push(cleaned);
      }
    }
  }
  
  return codes;
};