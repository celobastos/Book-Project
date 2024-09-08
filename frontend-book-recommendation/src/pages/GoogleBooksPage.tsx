import React, { useState } from 'react';
import GoogleSearchBar from '../components/SearchBar/GoogleSearchBar';
import styles from '../styles/GoogleBooksPage.module.css';
import NavBar from '../components/NavBar/NavBar';

const GoogleBooksPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any | null>(null);

  const handleSearchResults = (results: any) => {
    setSearchResults(results);
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    return (
      <span className={styles.stars}>
        {[...Array(totalStars)].map((_, i) => (
          <i
            key={i}
            className={`fa fa-star ${i < rating ? styles.filledStar : styles.emptyStar}`}
            aria-hidden="true"
          />
        ))}
      </span>
    );
  };


  function handleBookClick(book: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={styles.container}>
      <NavBar onBookClick={handleBookClick}  />
      <h1 className={styles.title}>Pesquisa no Google Books</h1>
      <GoogleSearchBar onResults={handleSearchResults} />

      {searchResults && (
        <div className={styles.results}>
          <div className={styles.resultCard}>
            <img src={searchResults.image} alt={searchResults.title} className={styles.bookImage} />
            <div className={styles.bookDetails}>
              <h3 className={styles.bookTitle}>{searchResults.title}</h3>
              <div className={styles.authorRating}>
                <p className={styles.bookAuthor}><strong>Autor:</strong> {searchResults.author}</p>
                {searchResults.averageRating && renderStars(searchResults.averageRating)}
              </div>
              <p className={styles.bookDescription}><strong>Descrição:</strong> {searchResults.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleBooksPage;
