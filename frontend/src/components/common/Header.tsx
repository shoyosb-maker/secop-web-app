interface HeaderProps {
  alertsCount: number;
  onOpenAlerts: () => void;
  onCheckAlerts: () => void;
}

export const Header = ({ alertsCount, onOpenAlerts, onCheckAlerts }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>🔍 SECOP III</h1>
          <p>Portal de Contratación Pública - Colombia</p>
        </div>
        <div className="header-actions">
          <button onClick={onOpenAlerts} className="btn-alerts">
            🔔 Alertas ({alertsCount})
          </button>
          <button onClick={onCheckAlerts} className="btn-check">
            🔄 Verificar alertas
          </button>
        </div>
      </div>
    </header>
  );
};