// frontend/src/components/dashboard/StatusChart.tsx

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#9e9e9e', '#2196f3', '#9c27b0', '#ff5722'];

interface StatusChartProps {
  data: Array<{ name: string; value: number }>;
}

// Formateador personalizado para el label de la torta
const renderCustomLabel = ({ name, percent }: { name?: string; percent?: number }) => {
  if (!name) return '';
  if (!percent) return name;
  const percentage = (percent * 100).toFixed(0);
  return `${name}: ${percentage}%`;
};

// Formateador personalizado para el tooltip
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string; value: number } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].payload.name}</p>
        <p style={{ margin: 0, color: '#1a472a' }}>{payload[0].value} procesos</p>
      </div>
    );
  }
  return null;
};

export const StatusChart = ({ data }: StatusChartProps) => {
  // Filtrar datos vacíos
  const validData = data.filter(item => item.value > 0);

  if (validData.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center',
        color: '#666'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>🥧 Procesos por Estado</h3>
        <p>No hay datos suficientes para mostrar el gráfico</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>🥧 Procesos por Estado</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={validData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {validData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};