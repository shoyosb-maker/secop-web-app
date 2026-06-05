// frontend/src/components/search/SearchFilters.tsx

import { MODALITIES, PHASES, STATUSES } from '../../utils/constants';
import { departments, citiesByDepartment } from '../../utils/citiesData';

interface SearchFiltersProps {
  department: string;
  setDepartment: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  entityName: string;
  setEntityName: (value: string) => void;
  modality: string;
  setModality: (value: string) => void;
  phase: string;
  setPhase: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;
  minValue: string;
  setMinValue: (value: string) => void;
  maxValue: string;
  setMaxValue: (value: string) => void;
}

export const SearchFilters = ({
  department,
  setDepartment,
  city,
  setCity,
  entityName,
  setEntityName,
  modality,
  setModality,
  phase,
  setPhase,
  status,
  setStatus,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue
}: SearchFiltersProps) => {
  const availableCities = department && citiesByDepartment[department] 
    ? ['', ...citiesByDepartment[department]] 
    : [''];

  return (
    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* Departamento */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {departments.map(d => (
            <option key={d || 'default'} value={d}>{d || 'Todos los departamentos'}</option>
          ))}
        </select>
        
        {/* Ciudad */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          disabled={!department}
        >
          {availableCities.map(c => (
            <option key={c || 'default'} value={c}>{c || 'Todas las ciudades'}</option>
          ))}
        </select>
        
        {/* Entidad */}
        <input
          type="text"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
          placeholder="Nombre de entidad"
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        {/* Modalidad */}
        <select
          value={modality}
          onChange={(e) => setModality(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {MODALITIES.map(m => (
            <option key={m || 'default'} value={m}>{m || 'Todas las modalidades'}</option>
          ))}
        </select>
        
        {/* Fase */}
        <select
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {PHASES.map(p => (
            <option key={p || 'default'} value={p}>{p || 'Todas las fases'}</option>
          ))}
        </select>
        
        {/* Estado */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {STATUSES.map(s => (
            <option key={s || 'default'} value={s}>{s || 'Todos los estados'}</option>
          ))}
        </select>
        
        {/* Fechas */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="Fecha desde"
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="Fecha hasta"
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        {/* Valores */}
        <input
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
          placeholder="Valor mínimo (COP)"
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
          placeholder="Valor máximo (COP)"
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};