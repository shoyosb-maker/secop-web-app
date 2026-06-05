import { useState, useEffect } from 'react';
import { Process, Alert, Notification } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/common/Footer';
import { SearchBar } from './components/search/SearchBar';
import { SearchFilters } from './components/search/SearchFilters';
import { ResultsTable } from './components/results/ResultsTable';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorAlert } from './components/common/ErrorAlert';
import { EmptyState } from './components/common/EmptyState';
import { AlertPanel } from './components/alerts/AlertPanel';
import { AlertNotification } from './components/alerts/AlertNotification';
import { ProcessModal } from './components/details/ProcessModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { saveActivity, syncLocalBackup, RecentActivity } from './services/googleSheets.service';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Process[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(20);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'search' | 'dashboard' | 'saved' | 'settings'>('dashboard');
  
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAlertPanel, setShowAlertPanel] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [savedProcesses, setSavedProcesses] = useState<Process[]>([]);
  
  const [entityName, setEntityName] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [modality, setModality] = useState('');
  const [phase, setPhase] = useState('');
  const [status, setStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 10;

  // Generar o recuperar session ID para usuario
  const getSessionId = () => {
    let sessionId = localStorage.getItem('secop_session_id');
    if (!sessionId) {
      sessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem('secop_session_id', sessionId);
    }
    return sessionId;
  };

  // Sincronizar respaldo local al iniciar
  useEffect(() => {
    syncLocalBackup();
  }, []);

  // Guardar actividad reciente en Google Sheets
  const saveToRecentActivity = async (process: Process) => {
    const activity: RecentActivity = {
      timestamp: new Date().toISOString(),
      process_id: process.id,
      entity: process.entity,
      title: process.title,
      modality: process.modality || 'No especificada',
      base_value: process.base_value,
      status: process.status,
      user_session: getSessionId()
    };
    
    const result = await saveActivity(activity);
    if (!result.success) {
      console.log('Actividad guardada localmente:', result.message);
    }
  };

  useEffect(() => {
    const savedAlerts = localStorage.getItem('secop_alerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
    const saved = localStorage.getItem('secop_saved_processes');
    if (saved) {
      setSavedProcesses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('secop_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('secop_saved_processes', JSON.stringify(savedProcesses));
  }, [savedProcesses]);

  useEffect(() => {
    setCity('');
  }, [department]);

  const getCurrentFilters = () => {
    const filters: any = {};
    if (entityName) filters.entity_name = entityName;
    if (department) filters.department = department;
    if (city) filters.city = city;
    if (modality) filters.modality = modality;
    if (phase) filters.phase = phase;
    if (status) filters.status = status;
    if (minValue) filters.min_value = Number(minValue);
    if (maxValue) filters.max_value = Number(maxValue);
    return filters;
  };

  const saveAlert = () => {
    if (!alertName.trim()) {
      alert('Por favor ingresa un nombre para la alerta');
      return;
    }
    
    const newAlert: Alert = {
      id: Date.now().toString(),
      name: alertName,
      query: query,
      filters: getCurrentFilters(),
      createdAt: new Date().toISOString(),
      lastChecked: new Date().toISOString(),
      lastResultCount: results.length
    };
    
    setAlerts([...alerts, newAlert]);
    setAlertName('');
    setShowAlertPanel(false);
    alert(`Alerta "${alertName}" guardada correctamente`);
  };

  const deleteAlert = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta alerta?')) {
      setAlerts(alerts.filter(a => a.id !== id));
    }
  };

  const loadAlert = (alert: Alert) => {
    setQuery(alert.query);
    setEntityName(alert.filters.entity_name || '');
    setDepartment(alert.filters.department || '');
    setCity(alert.filters.city || '');
    setModality(alert.filters.modality || '');
    setPhase(alert.filters.phase || '');
    setStatus(alert.filters.status || '');
    setMinValue(alert.filters.min_value?.toString() || '');
    setMaxValue(alert.filters.max_value?.toString() || '');
    setActiveTab('search');
    
    setTimeout(() => {
      const fakeEvent = new Event('submit') as any;
      handleSearch(fakeEvent);
    }, 100);
  };

  const checkAlerts = async () => {
    let hasNewResults = false;
    const updatedAlerts = [...alerts];
    
    for (let i = 0; i < updatedAlerts.length; i++) {
      const alert = updatedAlerts[i];
      
      try {
        const body: any = { query: alert.query, limit: 10 };
        Object.assign(body, alert.filters);
        
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        
        if (response.ok) {
          const data = await response.json();
          const newCount = data.data?.length || 0;
          
          if (newCount > alert.lastResultCount) {
            hasNewResults = true;
            setNotifications(prev => [...prev, {
              alertId: alert.id,
              message: `🔔 "${alert.name}" tiene ${newCount - alert.lastResultCount} proceso(s) nuevo(s)`
            }]);
          }
          
          updatedAlerts[i] = {
            ...alert,
            lastChecked: new Date().toISOString(),
            lastResultCount: newCount
          };
        }
      } catch (error) {
        console.error(`Error checking alert ${alert.name}:`, error);
      }
    }
    
    setAlerts(updatedAlerts);
    
    if (hasNewResults) {
      setTimeout(() => {
        setNotifications([]);
      }, 10000);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const body: any = { query, limit: limit };
      if (entityName) body.entity_name = entityName;
      if (department) body.department = department;
      if (city) body.city = city;
      if (fromDate) body.from_date = fromDate;
      if (toDate) body.to_date = toDate;
      if (minValue) body.min_value = Number(minValue);
      if (maxValue) body.max_value = Number(maxValue);
      if (modality) body.modality = modality;
      if (phase) body.phase = phase;
      if (status) body.status = status;

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      const fetchedResults = data.data || [];
      setResults(fetchedResults);
      setTotalResults(fetchedResults.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessClick = async (process: Process) => {
    // Guardar en actividad reciente (Google Sheets)
    await saveToRecentActivity(process);
    setSelectedProcess(process);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProcess(null);
  };

  const clearFilters = () => {
    setEntityName('');
    setDepartment('');
    setCity('');
    setFromDate('');
    setToDate('');
    setMinValue('');
    setMaxValue('');
    setModality('');
    setPhase('');
    setStatus('');
  };

  const removeSavedProcess = (id: string) => {
    setSavedProcesses(savedProcesses.filter(p => p.id !== id));
  };

  const handleRefresh = () => {
    if (query) {
      handleSearch(new Event('submit') as any);
    } else {
      window.location.reload();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'search':
        return (
          <>
            <SearchBar 
              query={query}
              setQuery={setQuery}
              limit={limit}
              setLimit={setLimit}
              onSearch={handleSearch}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              onClearFilters={clearFilters}
            />

            {showFilters && (
              <SearchFilters
                department={department}
                setDepartment={setDepartment}
                city={city}
                setCity={setCity}
                entityName={entityName}
                setEntityName={setEntityName}
                modality={modality}
                setModality={setModality}
                phase={phase}
                setPhase={setPhase}
                status={status}
                setStatus={setStatus}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
              />
            )}

            {loading && <LoadingSpinner />}
            {error && <ErrorAlert message={error} />}

            {!loading && !error && results.length > 0 && (
              <ResultsTable 
                processes={results} 
                totalResults={totalResults}
                pageSize={pageSize}
                onProcessClick={handleProcessClick} 
              />
            )}

            {!loading && !error && results.length === 0 && query === '' && <EmptyState />}
          </>
        );
      
      case 'saved':
        return (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <div style={{ 
              padding: '16px 24px', 
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f9fafb'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#012d1d', margin: 0 }}>
                📌 Procesos Guardados
              </h2>
            </div>
            {savedProcesses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
                <p>No tienes procesos guardados</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>Busca procesos y guárdalos para verlos aquí</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>ID / Entidad</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Título del Proceso</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Cuantía</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Estado</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedProcesses.map((process) => (
                      <tr key={process.id} style={{ cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }} onClick={() => handleProcessClick(process)}>
                        <td style={{ padding: '16px', verticalAlign: 'top' }}>
                          <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold', color: '#2c694e', marginBottom: '4px' }}>{process.id}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>{process.entity}</div>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 600, color: '#012d1d', marginBottom: '4px' }}>{process.title}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{process.modality || 'Modalidad no especificada'}</div>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 'bold', color: '#012d1d', fontSize: '16px' }}>
                            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(process.base_value)}
                          </div>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'center' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4caf50', display: 'inline-block' }}></span>
                            {process.status || 'Guardado'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'right' }}>
                          <button 
                            style={{
                              backgroundColor: '#dc2626',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              removeSavedProcess(process.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      
      case 'settings':
        return (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#012d1d', margin: 0 }}>⚙️ Configuración</h2>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#012d1d' }}>Alertas Guardadas</h3>
              {alerts.length === 0 ? (
                <p style={{ color: '#6b7280' }}>No hay alertas guardadas</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} style={{ 
                    padding: '12px', 
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong style={{ color: '#012d1d' }}>{alert.name}</strong>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        Búsqueda: "{alert.query}" | Resultados: {alert.lastResultCount}
                      </p>
                    </div>
                    <button 
                      onClick={() => deleteAlert(alert.id)}
                      style={{ padding: '4px 12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f8f9fa' }}>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        savedCount={savedProcesses.length}
      />

      <div style={{ flex: 1, marginLeft: '280px' }}>
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          padding: '12px 24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1280px',
            margin: '0 auto'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#012d1d', margin: 0 }}>
              {activeTab === 'dashboard' && '📊 Dashboard'}
              {activeTab === 'search' && '🔍 Búsqueda de Procesos'}
              {activeTab === 'saved' && '📌 Procesos Guardados'}
              {activeTab === 'settings' && '⚙️ Configuración'}
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleRefresh}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>refresh</span>
                Refrescar
              </button>
              
              <button 
                onClick={() => setShowAlertPanel(true)} 
                style={{
                  backgroundColor: '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🔔 Alertas ({alerts.length})
              </button>
              <button 
                onClick={checkAlerts}
                style={{
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🔄 Verificar alertas
              </button>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', width: '100%' }}>
          {renderContent()}
        </main>

        <Footer />
      </div>

      {showAlertPanel && (
        <AlertPanel
          alerts={alerts}
          alertName={alertName}
          setAlertName={setAlertName}
          onSaveAlert={saveAlert}
          onLoadAlert={loadAlert}
          onDeleteAlert={deleteAlert}
          onClose={() => setShowAlertPanel(false)}
        />
      )}

      {showModal && (
        <ProcessModal 
          process={selectedProcess} 
          onClose={closeModal} 
        />
      )}

      {notifications.map((notif, idx) => (
        <AlertNotification 
          key={idx} 
          message={notif.message} 
          onClose={() => setNotifications([])} 
        />
      ))}
    </div>
  );
}

export default App;