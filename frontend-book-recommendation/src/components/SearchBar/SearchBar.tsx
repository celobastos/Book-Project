import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Executa a busca
    }
  };

  // Adicione o evento para a tecla Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Aciona a busca ao pressionar Enter
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress} 
        placeholder="Pesquise..."
        className={styles.searchInput}
      />
      <button type="submit" onClick={handleSearch} className={styles.searchButton}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
