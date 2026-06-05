// frontend/src/components/alerts/AlertPanel.tsx

import { Alert } from '../../types';

interface AlertPanelProps {
  alerts: Alert[];
  alertName: string;
  setAlertName: (name: string) => void;
  onSaveAlert: () => void;
  onLoadAlert: (alert: Alert) => void;
  onDeleteAlert: (id: string) => void;
  onClose: () => void;
}

export const AlertPanel = ({
  alerts,
  alertName,
  setAlertName,
  onSaveAlert,
  onLoadAlert,
  onDeleteAlert,
  onClose
}: AlertPanelProps) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>📋 Mis Alertas</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Guardar búsqueda actual</h4>
        <input
          type="text"
          value={alertName}
          onChange={(e) => setAlertName(e.target.value)}
          placeholder="Nombre de la alerta (ej: Nuevas licitaciones TI)"
          style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={onSaveAlert}
          style={{ width: '100%', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px', cursor: 'pointer' }}
        >
          💾 Guardar alerta
        </button>
      </div>
      
      <hr />
      
      <h4>Alertas guardadas</h4>
      {alerts.length === 0 ? (
        <p style={{ color: '#666' }}>No hay alertas guardadas</p>
      ) : (
        alerts.map(alert => (
          <div key={alert.id} style={{
            background: '#f5f5f5',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{alert.name}</strong>
              <div>
                <button
                  onClick={() => onLoadAlert(alert)}
                  style={{ background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', marginRight: '5px', fontSize: '12px' }}
                >
                  Cargar
                </button>
                <button
                  onClick={() => onDeleteAlert(alert.id)}
                  style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              <div>📝 Búsqueda: "{alert.query}"</div>
              <div>📊 Últimos resultados: {alert.lastResultCount}</div>
              <div>📅 Creada: {new Date(alert.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};