import React, { useEffect, useState } from 'react';
import { getBooks, updateBook, deleteBook } from '../services/booksService';
import NavBar from '../components/NavBar/NavBar';
import styles from '../styles/MyBooks.module.css';
import noDataImage from '../assets/noData.png';
import BookDetailModal from '../components/Modal/BookDetailModal'; // Import the modal

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null); // State for the selected book
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all books once when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks(); // Fetch all books
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handler to open the modal with the selected book
  const handleBookClick = (book: any) => {
    setSelectedBook(book);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  // Handler to edit the book
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

  // Handler to delete the book
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

      <section className={styles.bookSection}>
        <h1 className={styles.title}>Minha Coleção de Livros</h1>
        {loading && <p>Carregando livros...</p>}
        {error && <p>{error}</p>}
        {!loading && books.length === 0 && <p>Nenhum livro encontrado.</p>}
        <div className={styles.booksGrid}>
          {books.map((book) => (
            <div key={book.id}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <div
                className={styles.bookCard}
                onClick={() => handleBookClick(book)}
              >
                <img 
                  src={book.coverImage ? book.coverImage : noDataImage} 
                  alt={book.title} 
                  className={styles.bookIcon} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

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

export default MyBooks;
