// frontend/src/components/dashboard/ValueDistributionChart.tsx

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ValueDistributionChartProps {
  data: Array<{ range: string; count: number }>;
}

export const ValueDistributionChart = ({ data }: ValueDistributionChartProps) => {
  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>💰 Distribución por Rango de Valor</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip formatter={(value) => `${value} procesos`} />
          <Bar dataKey="count" fill="#4caf50" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};