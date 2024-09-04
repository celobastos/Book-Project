import React, { useState, useCallback, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../services/booksService';
import SearchBar from '../components/SearchBar/SearchBar';
import GoogleSearchBar from '../components/SearchBar/GoogleSearchBar';
import styles from '../styles/HomePage.module.css';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [googleBook, setGoogleBook] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all books or filtered books
  const fetchBooks = useCallback(async (searchQuery: string = '') => {
    try {
      setLoading(true);
      const data = await getBooks(searchQuery); // Pass the search query to getBooks
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to handle search from the SearchBar
  const handleSearch = (searchQuery: string) => {
    fetchBooks(searchQuery); // Fetch books with the search query
  };

  // Function to handle search results from GoogleSearchBar
  const handleGoogleSearchResults = (result: any) => {
    setGoogleBook(result); // Set state for Google Books search result
  };

  // Function to create a new book in local storage
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

  // Function to update a book in local storage
  const handleUpdateBook = async (bookId: string) => {
    const updatedData = { title: 'Updated Book Title' };
    try {
      const updatedBook = await updateBook(bookId, updatedData);
      setBooks(books.map(book => (book.id === bookId ? updatedBook : book)));
    } catch (err) {
      setError('Failed to update book');
    }
  };

  // Function to delete a book from local storage
  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  // Fetch all books when the component mounts
  useEffect(() => {
    fetchBooks(); // This will call fetchBooks with no arguments, hence fetching all books
  }, [fetchBooks]);

  return (
    <div className={styles.container}>
      <h1>Book Repository</h1>
      
      {/* Search bar for local books */}
      <SearchBar onSearch={handleSearch} />
      
      <h2>Google Books Search</h2>
      {/* Search bar for Google Books */}
      <GoogleSearchBar onResults={handleGoogleSearchResults} />
      
      {/* Display loading, error, and book list */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {books.map(book => (
            <div key={book.id}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <button onClick={() => handleUpdateBook(book.id)}>Update</button>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Button to create a new book */}
      <button onClick={handleCreateBook}>Add New Book</button>

      {/* Display Google Book Result */}
      <h2>Google Book Result</h2>
      {googleBook ? (
        <div>
          <h2>{googleBook.title}</h2>
          <p>Author: {googleBook.author}</p>
          <p>Description: {googleBook.description}</p>
          <p>Average Rating: {googleBook.averageRating}</p>
          <p>Ratings Count: {googleBook.ratingsCount}</p>
          <p>Price: {googleBook.price}</p>
          <img src={googleBook.image} alt={googleBook.title} />
        </div>
      ) : (
        <p>No Google Book result yet.</p>
      )}
    </div>
  );
};

export default HomePage;
