// frontend/src/components/dashboard/TimelineChart.tsx

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface TimelineChartProps {
  data: Array<{ month: string; count: number; value: number }>;
}

export const TimelineChart = ({ data }: TimelineChartProps) => {
  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📈 Evolución de Procesos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'count') return [`${value} procesos`, 'Cantidad'];
              return [formatCurrency(value as number), 'Valor total'];
            }}
          />
          <Line yAxisId="left" type="monotone" dataKey="count" stroke="#1a472a" name="count" />
          <Line yAxisId="right" type="monotone" dataKey="value" stroke="#ff9800" name="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};