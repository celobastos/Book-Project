import React, { useState, useCallback, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../services/booksService';
import SearchBar from '../components/SearchBar/SearchBar';
import GoogleSearchBar from '../components/SearchBar/GoogleSearchBar';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/NavBar/NavBar';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [googleBook, setGoogleBook] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (searchQuery: string = '') => {
    try {
      setLoading(true);
      const data = await getBooks(searchQuery);
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (searchQuery: string) => {
    fetchBooks(searchQuery); 
  };

  const handleGoogleSearchResults = (result: any) => {
    setGoogleBook(result); 
  };

  const handleCreateBook = async () => {
    const newBook = {
      title: 'New Book',
      author: 'Unknown',
    };
    try {
      const createdBook = await createBook(newBook);
      setBooks([...books, createdBook]);
    } catch (err) {
      setError('Failed to create book');
    }
  };

  const handleUpdateBook = async (bookId: string) => {
    const updatedData = { title: 'Updated Book Title' };
    try {
      const updatedBook = await updateBook(bookId, updatedData);
      setBooks(books.map(book => (book.id === bookId ? updatedBook : book)));
    } catch (err) {
      setError('Failed to update book');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  return (
    <div className={styles.container}>
       <NavBar />
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Welcome to Your Book Archive</h1>
          <p>Store and organize all your books in one place</p>
          <button onClick={handleCreateBook} className={styles.addButton}>Add New Book</button>
        </div>
        <div className={styles.imagePlaceholder}></div>
      </header>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <h2>Search Your Collection</h2>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Google Books Search Section */}
      <section className={styles.googleBooksSearch}>
        <h2>Google Books Search</h2>
        <GoogleSearchBar onResults={handleGoogleSearchResults} />
      </section>

      {/* Recently Added Books Section */}
      <section className={styles.recentlyAdded}>
        <h2>Recently Added Books</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.booksGrid}>
            {books.map(book => (
              <div key={book.id} className={styles.bookCard}>
                <img src="/path-to-book-cover-icon.png" alt={book.title} className={styles.bookIcon} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className={styles.bookActions}>
                  <button onClick={() => handleUpdateBook(book.id)}>Update</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Google Book Result */}
      <section className={styles.googleBookResult}>
        <h2>Google Book Result</h2>
        {googleBook ? (
          <div className={styles.googleBookCard}>
            <img src={googleBook.image} alt={googleBook.title} />
            <h3>{googleBook.title}</h3>
            <p>Author: {googleBook.author}</p>
            <p>Description: {googleBook.description}</p>
            <p>Average Rating: {googleBook.averageRating}</p>
            <p>Ratings Count: {googleBook.ratingsCount}</p>
            <p>Price: {googleBook.price}</p>
          </div>
        ) : (
          <p>No Google Book result yet.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
