// frontend/src/components/dashboard/DepartmentChart.tsx

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DepartmentChartProps {
  data: Array<{ department: string; count: number }>;
}

export const DepartmentChart = ({ data }: DepartmentChartProps) => {
  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>🗺️ Top Departamentos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip formatter={(value) => `${value} procesos`} />
          <Bar dataKey="count" fill="#2196f3" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};