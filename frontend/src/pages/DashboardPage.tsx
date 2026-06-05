// frontend/src/pages/DashboardPage.tsx

import { useState } from 'react';
import { Dashboard } from '../components/dashboard/Dashboard';
import { SearchBar } from '../components/search/SearchBar';

export const DashboardPage = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [limit] = useState(20);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          limit={limit}
          setLimit={() => {}}
          onSearch={handleSearch}
          showFilters={false}
          setShowFilters={() => {}}
          onClearFilters={() => {}}
        />
      </div>
      <Dashboard initialQuery={searchQuery} />
    </div>
  );
};