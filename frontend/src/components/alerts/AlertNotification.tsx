// frontend/src/components/alerts/AlertNotification.tsx

interface AlertNotificationProps {
  message: string;
  onClose: () => void;
}

export const AlertNotification = ({ message, onClose }: AlertNotificationProps) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1100,
      animation: 'slideIn 0.3s ease-out',
      cursor: 'pointer'
    }} onClick={onClose}>
      {message}
      <span style={{ marginLeft: '10px', fontSize: '12px' }}>✕</span>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};