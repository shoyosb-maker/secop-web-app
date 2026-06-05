import { useState } from 'react';
import { Process } from '../../types';
import { ResultsTableRow } from './ResultsTableRow';
import { Pagination } from './Pagination';

interface ResultsTableProps {
  processes: Process[];
  totalResults: number;
  pageSize: number;
  onProcessClick: (process: Process) => void;
}

export const ResultsTable = ({ processes, totalResults, pageSize, onProcessClick }: ResultsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(processes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProcesses = processes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (processes.length === 0) return null;

  return (
    <div className="results-table-container" style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      <div className="table-header" style={{ 
        padding: '16px 24px', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#012d1d', margin: 0 }}>
          Procesos de Contratación Recientes
        </h2>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Total: <span style={{ fontWeight: 600, color: '#012d1d' }}>{totalResults}</span> procesos
        </div>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          minWidth: '900px'
        }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#414844', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ID / Entidad
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#414844', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Título del Proceso
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#414844', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Cuantía / Fechas
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#414844', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estado
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#414844', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Códigos UNSPSC
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#414844', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProcesses.map((process) => (
              <ResultsTableRow
                key={process.id}
                process={process}
                onClick={() => onProcessClick(process)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};