// frontend/src/components/results/ResultsStats.tsx

interface ResultsStatsProps {
  count: number;
}

export const ResultsStats = ({ count }: ResultsStatsProps) => {
  return (
    <div style={{ margin: '1rem 0', padding: '0.5rem', background: '#e8f5e9', borderRadius: '4px' }}>
      Se encontraron {count} procesos
    </div>
  );
};