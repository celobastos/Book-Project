import React, { useState } from 'react';
import styles from './GoogleSearchBar.module.css';

interface GoogleSearchBarProps {
  onResults: (result: any) => void;
}

const GoogleSearchBar: React.FC<GoogleSearchBarProps> = ({ onResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/recommendations?query=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          onResults(data);
        } else {
          console.error('Error fetching data from backend');
        }
      } catch (error) {
        console.error('Failed to fetch book recommendations:', error);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Pesquise por livros no google..."
        className={styles.googleSearchInput}
      />
      <button onClick={handleSearch} className={styles.googleSearchButton}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  
  );
};

export default GoogleSearchBar;
