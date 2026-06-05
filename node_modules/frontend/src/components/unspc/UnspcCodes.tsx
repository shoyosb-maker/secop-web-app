// frontend/src/components/unspc/UnspcCodes.tsx

import { useState } from 'react';
import { getAllUnspcCodes } from '../../utils/unspc';

interface UnspcCodesProps {
  unspsc_code?: string;
  unspsc_additional?: string;
}

export const UnspcCodes = ({ unspsc_code, unspsc_additional }: UnspcCodesProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const allCodes: string[] = getAllUnspcCodes(unspsc_code, unspsc_additional);

  if (allCodes.length === 0) {
    return <span style={{ color: '#999' }}>No definido</span>;
  }

  return (
    <div>
      <button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        style={{
          background: '#1a472a',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '0.75rem'
        }}
      >
        {isExpanded ? 'Ocultar' : `Ver ${allCodes.length} código(s)`}
      </button>
      {isExpanded && (
        <div style={{
          marginTop: '8px',
          background: '#f5f5f5',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '0.75rem'
        }}>
          <strong>Códigos UNSPSC:</strong>
          <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
            {allCodes.map((code: string, idx: number) => (
              <li key={idx} style={{ fontFamily: 'monospace' }}>{code}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};