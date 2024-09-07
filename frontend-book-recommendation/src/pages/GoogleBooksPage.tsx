import React, { useState } from 'react';
import GoogleSearchBar from '../components/SearchBar/GoogleSearchBar';
import styles from '../styles/GoogleBooksPage.module.css';
import NavBar from '../components/NavBar/NavBar';

const GoogleBooksPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any | null>(null);

  const handleSearchResults = (results: any) => {
    setSearchResults(results);
  };

  return (
    <div className={styles.container}>
         <NavBar />
      <h1>Google Books Search</h1>
      <GoogleSearchBar onResults={handleSearchResults} />

      {searchResults && (
        <div className={styles.results}>
          <h2>Search Results:</h2>
          <div className={styles.resultCard}>
            <h3>{searchResults.title}</h3>
            <p>{searchResults.author}</p>
            <img src={searchResults.image} alt={searchResults.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleBooksPage;
