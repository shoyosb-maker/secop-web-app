interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;
  onSearch: (e: React.FormEvent) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  onClearFilters: () => void;
}

export const SearchBar = ({
  query,
  setQuery,
  limit,
  setLimit,
  onSearch,
  showFilters,
  setShowFilters,
  onClearFilters
}: SearchBarProps) => {
  return (
    <form onSubmit={onSearch} className="search-area">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          placeholder="Buscar por entidad, título, o ID de proceso..."
        />
      </div>
      <div className="filter-bar">
        <span className="filter-label">FILTRAR POR:</span>
        <button type="button" onClick={() => setShowFilters(!showFilters)} className="filter-btn">
          {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          <span>▼</span>
        </button>
        
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="filter-btn"
        >
          <option value={10}>10 resultados</option>
          <option value={20}>20 resultados</option>
          <option value={50}>50 resultados</option>
          <option value={100}>100 resultados</option>
          <option value={200}>200 resultados</option>
          <option value={500}>500 resultados</option>
        </select>
        
        {showFilters && (
          <button type="button" onClick={onClearFilters} className="btn-apply">
            Limpiar filtros
          </button>
        )}
        <button type="submit" className="btn-apply">
          Aplicar Filtros
        </button>
      </div>
    </form>
  );
};