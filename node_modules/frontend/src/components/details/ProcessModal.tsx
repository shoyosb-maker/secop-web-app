// frontend/src/components/details/ProcessModal.tsx

import { Process } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getAllUnspcCodes } from '../../utils/unspc';

interface ProcessModalProps {
  process: Process | null;
  onClose: () => void;
}

export const ProcessModal = ({ process, onClose }: ProcessModalProps) => {
  if (!process) return null;

  const unspcCodes = getAllUnspcCodes(process.unspsc_code, process.unspsc_additional);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '1.5rem',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ✕
        </button>
        
        <h2 style={{ color: '#1a472a', marginBottom: '1rem', paddingRight: '2rem' }}>
          Detalles del Proceso
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <strong>ID del Proceso:</strong>
            <p style={{ margin: '0.25rem 0 0', fontFamily: 'monospace', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              {process.id}
            </p>
          </div>
          
          <div>
            <strong>Referencia:</strong>
            <p style={{ margin: '0.25rem 0 0', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              {process.reference || 'No disponible'}
            </p>
          </div>
          
          <div>
            <strong>Entidad:</strong>
            <p style={{ margin: '0.25rem 0 0', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              {process.entity}
            </p>
          </div>
          
          <div>
            <strong>Título:</strong>
            <p style={{ margin: '0.25rem 0 0', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              {process.title}
            </p>
          </div>
          
          <div>
            <strong>Descripción:</strong>
            <p style={{ margin: '0.25rem 0 0', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              {process.description || 'No disponible'}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>Cuantía:</strong>
              <p style={{ margin: '0.25rem 0 0', fontWeight: 'bold', color: '#1a472a' }}>
                {formatCurrency(process.base_value)}
              </p>
            </div>
            <div>
              <strong>Modalidad:</strong>
              <p style={{ margin: '0.25rem 0 0' }}>
                {process.modality || 'No disponible'}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>Estado:</strong>
              <p style={{ margin: '0.25rem 0 0' }}>
                {process.status}
              </p>
            </div>
            <div>
              <strong>Fase:</strong>
              <p style={{ margin: '0.25rem 0 0' }}>
                {process.phase || 'No disponible'}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>Fecha de Publicación:</strong>
              <p style={{ margin: '0.25rem 0 0' }}>
                {formatDate(process.publication_date)}
              </p>
            </div>
            <div>
              <strong>Fecha de Cierre:</strong>
              <p style={{ margin: '0.25rem 0 0' }}>
                {formatDate(process.deadline || '')}
              </p>
            </div>
          </div>
          
          <div>
            <strong>Códigos UNSPSC:</strong>
            <div style={{ margin: '0.25rem 0 0', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              {unspcCodes.length > 0 ? (
                unspcCodes.map(code => (
                  <span key={code} style={{
                    display: 'inline-block',
                    background: '#1a472a',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    margin: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem'
                  }}>
                    {code}
                  </span>
                ))
              ) : (
                <span>No definido</span>
              )}
            </div>
          </div>
          
          {process.url && (
            <div>
              <strong>URL del Proceso:</strong>
              <p style={{ margin: '0.25rem 0 0' }}>
                <a href={process.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1a472a' }}>
                  Ver en SECOP II →
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};