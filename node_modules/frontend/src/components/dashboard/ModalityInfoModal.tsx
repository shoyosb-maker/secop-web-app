// frontend/src/components/dashboard/ModalityInfoModal.tsx

import { ModalidadInfo } from '../../utils/modalidadesInfo';

interface ModalityInfoModalProps {
  info: ModalidadInfo | null;
  onClose: () => void;
}

export const ModalityInfoModal = ({ info, onClose }: ModalityInfoModalProps) => {
  if (!info) return null;

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
        borderRadius: '16px',
        maxWidth: '550px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '1.5rem',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
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
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>📋</span>
          <h2 style={{ margin: 0, color: '#1a472a' }}>{info.name}</h2>
        </div>
        
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ lineHeight: 1.6, color: '#333', margin: 0 }}>
            {info.description}
          </p>
        </div>
        
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1a472a' }}>📌 Características:</h4>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {info.characteristics.map((char, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem', color: '#555' }}>{char}</li>
            ))}
          </ul>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ background: '#e8f5e9', padding: '0.75rem', borderRadius: '8px' }}>
            <strong style={{ color: '#1a472a' }}>💰 Cuantía típica:</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>{info.typicalValue}</p>
          </div>
          <div style={{ background: '#e3f2fd', padding: '0.75rem', borderRadius: '8px' }}>
            <strong style={{ color: '#1565c0' }}>📅 Cuándo se usa:</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>{info.whenUsed}</p>
          </div>
        </div>
        
        <div style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center', marginTop: '1rem' }}>
          Fuente: Colombia Compra Eficiente - Ley 1150 de 2007
        </div>
      </div>
    </div>
  );
};