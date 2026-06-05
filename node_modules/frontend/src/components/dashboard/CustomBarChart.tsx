// frontend/src/components/dashboard/CustomBarChart.tsx

import { useState } from 'react';

interface CustomBarChartProps {
  data: Array<{ month: string; count: number; value: number }>;
}

const formatValue = (value: number): string => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(0)}M`;
  }
  return `$${value.toLocaleString()}`;
};

export const CustomBarChart = ({ data }: CustomBarChartProps) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const getHeight = (value: number) => (value / maxValue) * 180;

  return (
    <div className="h-64 relative chart-grid border-l border-b border-gray-200 ml-8 mt-4">
      <div className="absolute inset-0 flex items-end justify-around px-4 pb-0">
        {data.map((item, idx) => {
          const height = getHeight(item.value);
          const isHovered = hoveredBar === idx;
          
          return (
            <div 
              key={idx}
              className="group relative w-12 transition-all duration-200"
              style={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
              onMouseEnter={() => setHoveredBar(idx)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div 
                className={`w-full rounded-t-lg transition-all duration-200 cursor-pointer ${
                  idx === data.length - 1 
                    ? 'bg-primary text-white' 
                    : 'bg-primary/60 hover:bg-primary'
                }`}
                style={{ height: `${height}px` }}
              >
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-200 ${
                  isHovered || idx === data.length - 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="bg-primary text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                    {formatValue(item.value)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* X-Axis Labels */}
      <div className="absolute -bottom-6 inset-x-0 flex justify-around text-xs text-gray-500 font-medium">
        {data.map((item, idx) => (
          <span key={idx} className="w-12 text-center">{item.month}</span>
        ))}
      </div>
      
      {/* Y-Axis Labels */}
      <div className="absolute -left-10 inset-y-0 flex flex-col justify-between text-xs text-gray-400 py-0">
        <span>{formatValue(maxValue)}</span>
        <span>{formatValue(maxValue * 0.75)}</span>
        <span>{formatValue(maxValue * 0.5)}</span>
        <span>{formatValue(maxValue * 0.25)}</span>
        <span>$0</span>
      </div>
    </div>
  );
};