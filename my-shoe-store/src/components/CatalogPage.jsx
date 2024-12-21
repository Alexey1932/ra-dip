import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import CatalogComponent from './CatalogComponent';
import Footer from './Footer';
import SearchComponent from './SearchComponent';

function CatalogPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('search');
    setSearchQuery(query || '');
  }, [location]);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  return (
    <div>
      <Header />
      <h2 className="text-center">Каталог</h2>
      <SearchComponent onSearch={handleSearch} initialSearchTerm={searchQuery} />
      <CatalogComponent searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

export default CatalogPage;
