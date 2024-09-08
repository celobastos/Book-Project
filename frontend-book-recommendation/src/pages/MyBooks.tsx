import React, { useEffect, useState, useCallback } from 'react';
import { getBooks, updateBook, deleteBook } from '../services/booksService';
import NavBar from '../components/NavBar/NavBar';
import styles from '../styles/MyBooks.module.css';
import noDataImage from '../assets/noData.png';
import BookDetailModal from '../components/Modal/BookDetailModal'; // Import the modal
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'; // Import a loading spinner component

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<any[]>([]); // Books to display with pagination
  const [selectedBook, setSelectedBook] = useState<any | null>(null); // State for the selected book
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // Separate state for infinite scroll loading
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Page state
  const [hasMore, setHasMore] = useState<boolean>(true); // To keep track if more data is available
  const [allBooksLoadedMessage, setAllBooksLoadedMessage] = useState<boolean>(false); // State for the all-books-loaded message
  const booksPerPage = 10; // Number of books to display per "page"

  // Fetch all books once when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks(); // Fetch all books at once
        setBooks(data); // Store all books in state
        setDisplayedBooks(data.slice(0, booksPerPage)); // Display the first "page" of books
        setHasMore(data.length > booksPerPage); // Check if there are more books to load
      } catch (err) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Load more books as the user scrolls down
  const loadMoreBooks = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true); // Start the loading animation for more books
      const nextPage = page + 1;
      const newBooks = books.slice(0, nextPage * booksPerPage);
      setDisplayedBooks(newBooks);
      setPage(nextPage);
      setHasMore(newBooks.length < books.length); // Stop loading more if we've displayed all books

      if (newBooks.length >= books.length) {
        setAllBooksLoadedMessage(true); // Show message when all books are loaded
        setTimeout(() => setAllBooksLoadedMessage(false), 3000); // Hide the message after 3 seconds
      }

      setLoadingMore(false); // Stop the loading animation
    }
  }, [books, hasMore, loadingMore, page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 && hasMore && !loadingMore
      ) {
        loadMoreBooks();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, loadMoreBooks]);

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
        setDisplayedBooks(books.map(book => (book.id === selectedBook.id ? updatedBookResponse : book)));

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
        setDisplayedBooks(displayedBooks.filter(book => book.id !== selectedBook.id));
        handleCloseModal();
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  return (
    <div className={styles.container}>
      <NavBar onBookClick={handleBookClick} />

      <section className={styles.bookSection}>
        <h1 className={styles.title}>Minha Coleção de Livros</h1>
        {loading && <LoadingSpinner />} {/* Spinner while loading */}
        {error && <p>{error}</p>}
        {!loading && books.length === 0 && <p>Nenhum livro encontrado.</p>}
        <div className={styles.booksGrid}>
          {displayedBooks.map((book) => (
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

      {/* Notificação visual para quando todos os livros forem carregados */}
      {allBooksLoadedMessage && (
        <div className={styles.allBooksLoadedMessage}>
          <p>Todos os livros foram carregados.</p>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
