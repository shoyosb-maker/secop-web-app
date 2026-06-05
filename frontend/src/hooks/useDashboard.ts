// frontend/src/hooks/useDashboard.ts

import { useState, useCallback } from 'react';

interface DashboardData {
  totalProcesses: number;
  totalValue: number;
  activeProcesses: number;
  avgValue: number;
  byModality: Array<{ name: string; value: number }>;
  byStatus: Array<{ name: string; value: number }>;
  byMonth: Array<{ month: string; count: number; value: number }>;
  byValueRange: Array<{ range: string; count: number }>;
  topDepartments: Array<{ department: string; count: number }>;
}

export const useDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchDashboardData = useCallback(async (query?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Buscar procesos para el dashboard
      const body: any = { 
        query: query || '', 
        limit: 500  // Traemos suficientes datos para estadísticas
      };
      
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error al cargar datos del dashboard');
      }

      const result = await response.json();
      const processes = result.data || [];

      // Procesar datos para estadísticas
      const dashboardData = processDashboardData(processes);
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, fetchDashboardData };
};

// Función para procesar los datos y generar estadísticas
const processDashboardData = (processes: any[]): DashboardData => {
  // Totales
  const totalProcesses = processes.length;
  const totalValue = processes.reduce((sum, p) => sum + (p.base_value || 0), 0);
  const activeProcesses = processes.filter(p => p.status === 'Activo' || p.status === 'Abierto').length;
  const avgValue = totalProcesses > 0 ? totalValue / totalProcesses : 0;

  // Por modalidad
  const modalityMap = new Map<string, number>();
  processes.forEach(p => {
    const modality = p.modality || 'No especificada';
    modalityMap.set(modality, (modalityMap.get(modality) || 0) + 1);
  });
  const byModality = Array.from(modalityMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Por estado
  const statusMap = new Map<string, number>();
  processes.forEach(p => {
    const status = p.status || 'No especificado';
    statusMap.set(status, (statusMap.get(status) || 0) + 1);
  });
  const byStatus = Array.from(statusMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Por mes (evolución temporal)
  const monthMap = new Map<string, { count: number; value: number }>();
  processes.forEach(p => {
    if (p.publication_date) {
      const month = new Date(p.publication_date).toLocaleDateString('es-CO', { month: 'short', year: '2-digit' });
      const existing = monthMap.get(month) || { count: 0, value: 0 };
      monthMap.set(month, {
        count: existing.count + 1,
        value: existing.value + (p.base_value || 0)
      });
    }
  });
  const byMonth = Array.from(monthMap.entries())
    .map(([month, data]) => ({ month, count: data.count, value: data.value }))
    .slice(-12); // Últimos 12 meses

  // Por rango de valores
  const ranges = [
    { label: '< $10M', min: 0, max: 10000000 },
    { label: '$10M - $50M', min: 10000000, max: 50000000 },
    { label: '$50M - $100M', min: 50000000, max: 100000000 },
    { label: '$100M - $500M', min: 100000000, max: 500000000 },
    { label: '$500M - $1B', min: 500000000, max: 1000000000 },
    { label: '> $1B', min: 1000000000, max: Infinity }
  ];
  
  const byValueRange = ranges.map(range => ({
    range: range.label,
    count: processes.filter(p => (p.base_value || 0) >= range.min && (p.base_value || 0) < range.max).length
  }));

  // Top departamentos
  const deptMap = new Map<string, number>();
  processes.forEach(p => {
    // Nota: department no viene directamente, se puede inferir de la entidad o agregar después
    // Por ahora usamos la entidad como categoría
    const dept = p.entity?.split(' ')[0] || 'Otros';
    deptMap.set(dept, (deptMap.get(dept) || 0) + 1);
  });
  const topDepartments = Array.from(deptMap.entries())
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalProcesses,
    totalValue,
    activeProcesses,
    avgValue,
    byModality,
    byStatus,
    byMonth,
    byValueRange,
    topDepartments
  };
};