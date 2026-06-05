interface SidebarProps {
  activeTab: 'search' | 'dashboard' | 'saved' | 'settings';
  onTabChange: (tab: 'search' | 'dashboard' | 'saved' | 'settings') => void;
  savedCount?: number;
}

export const Sidebar = ({ activeTab, onTabChange, savedCount = 0 }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'dashboard', color: '#1a472a' },
    { id: 'search' as const, label: 'Search', icon: 'search', color: '#1a472a' },
    { id: 'saved' as const, label: 'Saved Processes', icon: 'bookmarks', color: '#1a472a' },
    { id: 'settings' as const, label: 'Settings', icon: 'settings', color: '#1a472a' },
  ];

  return (
    <aside style={{
      width: '280px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
      boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
    }}>
      {/* Logo y Brand */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 800, 
          color: '#012d1d',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          SECOP <span style={{ color: '#2c694e' }}>III</span>
        </h1>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          margin: '4px 0 0',
          lineHeight: 1.4
        }}>
          Procurement Portal<br />
          <span style={{ opacity: 0.7 }}>Government of Colombia</span>
        </p>
      </div>

      {/* Menú de Navegación */}
      <nav style={{ flex: 1, padding: '20px 12px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              marginBottom: '4px',
              backgroundColor: activeTab === item.id ? '#e8f5e9' : 'transparent',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: activeTab === item.id ? '#012d1d' : '#475569',
              fontWeight: activeTab === item.id ? 600 : 500
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              {item.icon}
            </span>
            <span style={{ fontSize: '14px', flex: 1, textAlign: 'left' }}>
              {item.label}
            </span>
            {item.id === 'saved' && savedCount > 0 && (
              <span style={{
                backgroundColor: '#012d1d',
                color: 'white',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '20px'
              }}>
                {savedCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Botón New Process */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0' }}>
        <button style={{
          width: '100%',
          backgroundColor: '#012d1d',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          New Process
        </button>
      </div>

      {/* Footer del Sidebar */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '10px 12px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          color: '#64748b',
          fontSize: '14px',
          marginBottom: '8px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>contact_support</span>
          Support
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '10px 12px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          color: '#64748b',
          fontSize: '14px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          Log Out
        </button>
      </div>
    </aside>
  );
};