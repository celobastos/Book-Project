import React, { useState, useCallback, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../services/booksService';
import NavBar from '../components/NavBar/NavBar';
import AddBookForm from '../components/BookForm/AddBookForm';
import FunctionalitiesSection from '../components/Functionalities/FunctionalitiesSection';
import BookDetailModal from '../components/Modal/BookDetailModal';
import styles from '../styles/HomePage.module.css';
import noDataImage from '../assets/noData.png';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
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

  const handleCreateBook = async (bookData: { title: string; author: string; description: string }) => {
    try {
      const createdBook = await createBook(bookData);
      setBooks((prevBooks) => [...prevBooks, createdBook]);
    } catch (err) {
      setError('Failed to create book');
    }
  };

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleEditBook = async (updatedBook: { title: string; author: string; review: string }) => {
    if (selectedBook) {
      try {
        const updatedData = {
          title: updatedBook.title,
          author: updatedBook.author,
          review: updatedBook.review,
        };

        const updatedBookResponse = await updateBook(selectedBook.id, updatedData);

        setBooks(books.map(book => (book.id === selectedBook.id ? updatedBookResponse : book)));
        
        handleCloseModal();
      } catch (err) {
        setError('Failed to update book');
      }
    }
  };

  const handleDeleteBook = async () => {
    if (selectedBook) {
      try {
        await deleteBook(selectedBook.id);
        setBooks(books.filter(book => book.id !== selectedBook.id));
        handleCloseModal();
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  return (
    <div className={styles.container}>
      <NavBar onBookClick={handleBookClick}  />

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
                <div
                  className={styles.bookCard}
                  onClick={() => handleBookClick(book)}
                >
                <img 
                  src={book.coverImage ? book.coverImage : noDataImage} 
                  alt={'No Data'} 
                  className={styles.bookIcon} 
                />
              </div>

              </div>
            ))}
          </div>
        )}
      </section>

      <AddBookForm onSubmit={handleCreateBook} />
      <FunctionalitiesSection />

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={handleCloseModal}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      )}
    </div>
  );
};

export default HomePage;
