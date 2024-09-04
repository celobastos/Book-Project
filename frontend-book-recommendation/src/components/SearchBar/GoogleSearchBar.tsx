import React, { useState } from 'react';
import styles from './SearchBar.module.css'; // Use your existing styles or create new ones

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
    <div className={styles.searchBar}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for book recommendations..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default GoogleSearchBar;
