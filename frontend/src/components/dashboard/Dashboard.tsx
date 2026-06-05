import { useState, useEffect } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorAlert } from '../common/ErrorAlert';
import { getRecentActivity, RecentActivity } from '../../services/googleSheets.service';

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('6');
  const { loading, error, data, fetchDashboardData } = useDashboard();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  // Cargar datos del dashboard
  useEffect(() => {
    fetchDashboardData('');
    loadRecentActivity();
  }, []);

  const loadRecentActivity = async () => {
    setLoadingActivity(true);
    const activities = await getRecentActivity();
    setRecentActivity(activities.slice(0, 4));
    setLoadingActivity(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!data) return null;

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(0)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  // Preparar datos para el gráfico (últimos 6 meses)
  const chartData = data.byMonth.slice(-6).map((item) => ({
    month: item.month,
    value: item.value,
    height: Math.min(Math.max((item.value / Math.max(...data.byMonth.map(m => m.value), 1)) * 100, 10), 100)
  }));

  const maxChartValue = Math.max(...data.byMonth.map(m => m.value), 4000000000);

  // Procesos para la tabla de actividad reciente (desde Google Sheets)
  const displayActivity = recentActivity.length > 0 ? recentActivity : [
    { process_id: 'Sin actividad', entity: 'N/A', title: 'No hay actividad reciente', modality: '', base_value: 0, status: '', timestamp: '', user_session: '' }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Publicado':
        return { bg: '#d1fae5', color: '#065f46', dot: '#059669' };
      case 'Aprobado':
        return { bg: '#dbeafe', color: '#1e40af', dot: '#2563eb' };
      case 'Cancelado':
        return { bg: '#fee2e2', color: '#991b1b', dot: '#dc2626' };
      default:
        return { bg: '#fef3c7', color: '#92400e', dot: '#d97706' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#012d1d', backgroundColor: '#e8f5e9', padding: '8px', borderRadius: '8px' }}>account_balance</span>
            <span style={{ color: '#059669', fontSize: '12px', fontWeight: 'bold' }}>+12%</span>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Procesos Activos</p>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#012d1d' }}>{data.activeProcesses.toLocaleString()}</h3>
        </div>

        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: '8px', borderRadius: '8px' }}>priority_high</span>
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: 'bold' }}>Total</span>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Procesos</p>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#012d1d' }}>{data.totalProcesses.toLocaleString()}</h3>
        </div>

        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#2c694e', backgroundColor: '#e8f5e9', padding: '8px', borderRadius: '8px' }}>payments</span>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cuantía Total</p>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#012d1d' }}>{formatCurrency(data.totalValue)} <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#6b7280' }}>COP</span></h3>
        </div>

        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#2563eb', backgroundColor: '#dbeafe', padding: '8px', borderRadius: '8px' }}>visibility</span>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Valor Promedio</p>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#012d1d' }}>{formatCurrency(data.avgValue)}</h3>
        </div>
      </div>

      {/* Visualization Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Main Chart */}
        <div style={{ gridColumn: 'span 2', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#012d1d' }}>Estadísticas de Contratación</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', padding: '6px 12px' }}
              >
                <option value="6">Últimos 6 meses</option>
                <option value="12">Últimos 12 meses</option>
                <option value="current">Año actual</option>
              </select>
              <button style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
              </button>
            </div>
          </div>
          
          <div className="chart-grid" style={{ height: '256px', position: 'relative', borderLeft: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', marginLeft: '32px', marginTop: '16px' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '0 16px' }}>
              {chartData.map((item, index) => {
                const maxHeight = Math.max(...chartData.map(d => d.height), 1);
                const barHeight = (item.height / maxHeight) * 85;
                const isLast = index === chartData.length - 1;
                return (
                  <div key={index} style={{ position: 'relative', width: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100%' }}>
                    <div 
                      style={{
                        width: '100%',
                        backgroundColor: isLast ? '#012d1d' : 'rgba(1, 45, 29, 0.6)',
                        height: `${Math.max(barHeight, 5)}%`,
                        borderRadius: '8px 8px 0 0',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#012d1d';
                      }}
                      onMouseLeave={(e) => {
                        if (!isLast) {
                          e.currentTarget.style.backgroundColor = 'rgba(1, 45, 29, 0.6)';
                        }
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '-32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#012d1d',
                        color: 'white',
                        fontSize: '10px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        display: isLast ? 'block' : 'none',
                      }}>
                        {formatCurrency(item.value)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ position: 'absolute', bottom: '-24px', left: 0, right: 0, display: 'flex', justifyContent: 'space-around', fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>
              {chartData.map((item, index) => (
                <span key={index} style={{ width: '48px', textAlign: 'center' }}>{item.month}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', left: '-40px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af' }}>
              <span>{formatCurrency(maxChartValue)}</span>
              <span>{formatCurrency(maxChartValue * 0.75)}</span>
              <span>{formatCurrency(maxChartValue * 0.5)}</span>
              <span>{formatCurrency(maxChartValue * 0.25)}</span>
              <span>$0</span>
            </div>
          </div>
        </div>

        {/* Side Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: '#012d1d', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Observatorio de Transparencia</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>Accede a datos abiertos actualizados en tiempo real.</p>
              <button style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#a7f3d0', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>
                Explorar
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </button>
            </div>
            <span className="material-symbols-outlined" style={{ position: 'absolute', bottom: '-32px', right: '-32px', fontSize: '160px', opacity: 0.1, color: 'white' }}>monitoring</span>
          </div>

          <div style={{ backgroundColor: '#f3f4f6', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#012d1d', textTransform: 'uppercase', marginBottom: '16px' }}>Próximos Vencimientos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.byModality.slice(0, 2).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: idx === 0 ? '#dc2626' : '#012d1d' }}></div>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', flex: 1 }}>{item.name.substring(0, 20)}...</span>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>{idx === 0 ? '2h restantes' : 'Mañana'}</span>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', marginTop: '16px', padding: '8px', backgroundColor: 'transparent', color: '#012d1d', fontWeight: 'bold', fontSize: '12px', border: '1px solid #012d1d', borderRadius: '8px', cursor: 'pointer' }}>
              Ver calendario completo
            </button>
          </div>
        </div>
      </div>

      {/* Activity Table Area - Con datos de Google Sheets */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="material-symbols-outlined" style={{ color: '#012d1d' }}>history</span>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#012d1d' }}>Actividad Reciente</h2>
          </div>
          <button 
            onClick={loadRecentActivity}
            style={{ padding: '8px 16px', fontSize: '14px', color: '#012d1d', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loadingActivity ? 'Cargando...' : 'Refrescar'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f3f4f6' }}>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Referencia / Entidad</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Objeto del Proceso</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Valor Estimado</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Estado</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {displayActivity.map((activity, idx) => {
                const statusStyle = getStatusStyle(activity.status);
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold', color: '#2c694e', marginBottom: '4px' }}>
                        {activity.process_id}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>{activity.entity}</div>
                    </td>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top', maxWidth: '400px' }}>
                      <div style={{ fontWeight: 'bold', color: '#012d1d' }}>{activity.title}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>{activity.modality}</div>
                    </td>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 'bold', color: '#012d1d', fontSize: '16px' }}>
                        {formatCurrency(activity.base_value)}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', verticalAlign: 'middle', textAlign: 'center' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        padding: '4px 12px', 
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: '9999px', 
                        fontSize: '12px', 
                        fontWeight: 'bold' 
                      }}>
                        <span style={{ 
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '50%', 
                          backgroundColor: statusStyle.dot,
                          display: 'inline-block' 
                        }}></span>
                        {activity.status || 'Desconocido'}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', verticalAlign: 'middle', textAlign: 'right' }}>
                      <button 
                        style={{ backgroundColor: '#012d1d', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Mostrando las últimas actualizaciones de sus seguimientos activos.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
            </button>
            <button style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};