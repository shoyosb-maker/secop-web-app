import { Process } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { UnspcCodes } from '../unspc/UnspcCodes';

interface ResultsTableRowProps {
  process: Process;
  onClick: () => void;
}

const getStatusClass = (status: string) => {
  const s = status?.toLowerCase() || '';
  if (s === 'abierto' || s === 'activo' || s === 'publicado') return 'status-published';
  if (s === 'adjudicado' || s === 'aprobado') return 'status-approved';
  if (s === 'cancelado' || s === 'borrador') return 'status-cancelled';
  return 'status-evaluation';
};

const getDotClass = (status: string) => {
  const s = status?.toLowerCase() || '';
  if (s === 'abierto' || s === 'activo' || s === 'publicado') return 'dot-published';
  if (s === 'adjudicado' || s === 'aprobado') return 'dot-approved';
  if (s === 'cancelado' || s === 'borrador') return 'dot-cancelled';
  return 'dot-evaluation';
};

export const ResultsTableRow = ({ process, onClick }: ResultsTableRowProps) => {
  // Verificar si hay fecha válida
  const hasValidDate = process.publication_date && process.publication_date !== 'N/A' && process.publication_date !== '';
  
  return (
    <tr onClick={onClick} style={{ cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>
      {/* Columna ID / Entidad */}
      <td style={{ padding: '16px', verticalAlign: 'top' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold', color: '#2c694e', marginBottom: '4px' }}>
          {process.id}
        </div>
        <div style={{ fontSize: '14px', color: '#414844' }}>
          {process.entity}
        </div>
      </td>
      
      {/* Columna Título */}
      <td style={{ padding: '16px', verticalAlign: 'top' }}>
        <div style={{ fontWeight: 600, color: '#012d1d', marginBottom: '4px' }}>
          {process.title}
        </div>
        <div style={{ fontSize: '12px', color: '#414844', opacity: 0.7 }}>
          {process.modality || 'Modalidad no especificada'}
        </div>
      </td>
      
      {/* Columna Cuantía / Fechas */}
      <td style={{ padding: '16px', verticalAlign: 'top' }}>
        <div style={{ fontWeight: 'bold', color: '#012d1d', fontSize: '16px' }}>
          {formatCurrency(process.base_value)}
        </div>
        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
          📅 Publicación: {hasValidDate ? formatDate(process.publication_date) : 'No disponible'}
        </div>
        {process.deadline && (
          <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '2px' }}>
            ⏰ Cierre: {formatDate(process.deadline)}
          </div>
        )}
      </td>
      
      {/* Columna Estado */}
      <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'center' }}>
        <span className={`status-badge ${getStatusClass(process.status)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span className={`status-dot ${getDotClass(process.status)}`} style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
          {process.status || 'No especificado'}
        </span>
      </td>
      
      {/* Columna Códigos UNSPSC */}
      <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'center' }}>
        <UnspcCodes 
          unspsc_code={process.unspsc_code} 
          unspsc_additional={process.unspsc_additional} 
        />
      </td>
      
      {/* Columna Acción */}
      <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'right' }}>
        <button 
          className="btn-details" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onClick(); 
          }}
          style={{
            backgroundColor: '#012d1d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Ver Detalles
        </button>
      </td>
    </tr>
  );
};