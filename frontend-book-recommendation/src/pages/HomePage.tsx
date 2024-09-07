import React, { useState, useCallback, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../services/booksService';
import SearchBar from '../components/SearchBar/SearchBar';
import GoogleSearchBar from '../components/SearchBar/GoogleSearchBar';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import AddBookForm from '../components/BookForm/AddBookForm';
import FunctionalitiesSection from '../components/Functionalities/FunctionalitiesSection';

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

  const handleCreateBook = async (bookData: { title: string; author: string; description: string }) => {
    try {
      const createdBook = await createBook(bookData);
      setBooks((prevBooks) => [...prevBooks, createdBook]); // Add the new book to the existing list
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
          <button onClick={() => handleCreateBook({ title: 'Sample Title', author: 'Sample Author', description: 'Sample Description' })} className={styles.addButton}>
            Add New Book
          </button>
        </div>
        <div className={styles.imagePlaceholder}></div>
      </header>
      
      <section className={styles.recentlyAdded}>
        <h2>Recently Added Books</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.booksGrid}>
            {books.slice(-5).map((book) => (
              <div key={book.id}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <Link to={`/books/${book.id}`} className={styles.bookCard}>
                <img 
                  src={book.coverImage ? book.coverImage : '/path-to-book-cover-icon.png'} 
                  alt={book.title} 
                  className={styles.bookIcon} 
                />
              </Link>
            </div>
            ))}
          </div>
        )}
      </section>


      <AddBookForm onSubmit={handleCreateBook} />

      <FunctionalitiesSection />
    </div>
  );
};

export default HomePage;
