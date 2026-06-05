// frontend/src/components/dashboard/ModalityChart.tsx

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getModalidadInfo } from '../../utils/modalidadesInfo';
import { ModalityInfoModal } from './ModalityInfoModal';

// Colores para las barras
const COLORS = ['#1a472a', '#2e7d32', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9', '#1b5e20', '#0d2818', '#3c8c40', '#66bb6a'];

interface ModalityChartProps {
  data: Array<{ name: string; value: number }>;
}

// Formateador personalizado para el tooltip
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px 15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#1a472a' }}>{label}</p>
        <p style={{ margin: '5px 0 0', color: '#333' }}>
          <strong>{payload[0].value}</strong> procesos
        </p>
        <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.75rem' }}>
          💡 Haz clic para ver más información
        </p>
      </div>
    );
  }
  return null;
};

export const ModalityChart = ({ data }: ModalityChartProps) => {
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  
  // Filtrar datos vacíos
  const validData = data.filter(item => item.value > 0);

  const handleBarClick = (data: any) => {
    if (data && data.activeLabel) {
      setSelectedModality(data.activeLabel);
    }
  };

  const handleCloseModal = () => {
    setSelectedModality(null);
  };

  const modalidadInfo = selectedModality ? getModalidadInfo(selectedModality) : null;

  if (validData.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center',
        color: '#666'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.2rem' }}>📊 Procesos por Modalidad</h3>
        <p>No hay datos suficientes para mostrar el gráfico</p>
      </div>
    );
  }

  return (
    <>
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: '100%'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.2rem' }}>
          📊 Procesos por Modalidad
        </h3>
        <p style={{ margin: '-0.5rem 0 1rem 0', fontSize: '0.8rem', color: '#666' }}>
          💡 Haz clic en cualquier barra para ver información detallada sobre la modalidad
        </p>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={validData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 140, bottom: 20 }}
            onClick={handleBarClick}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tick={{ fontSize: 12 }}
              label={{ value: 'Cantidad de procesos', position: 'bottom', offset: 5 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={140}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => {
                // Acortar nombres largos
                if (value.length > 35) {
                  return value.substring(0, 32) + '...';
                }
                return value;
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f5f5' }} />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
              cursor="pointer"
            >
              {validData.map((_entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  onClick={() => setSelectedModality(_entry.name)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Modal de información de la modalidad */}
      {selectedModality && modalidadInfo && (
        <ModalityInfoModal
          info={modalidadInfo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};