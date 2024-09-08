import React, { useEffect, useState, useCallback } from 'react';
import { getBooks, updateBook, deleteBook } from '../services/booksService';
import NavBar from '../components/NavBar/NavBar';
import styles from '../styles/MyBooks.module.css';
import BookDetailModal from '../components/Modal/BookDetailModal';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import BookGrid from '../components/BooksGrid/BooksGrid';

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [allBooksLoadedMessage, setAllBooksLoadedMessage] = useState<boolean>(false);
  const booksPerPage = 10;

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
        setDisplayedBooks(data.slice(0, booksPerPage));
        setHasMore(data.length > booksPerPage);
      } catch (err) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const loadMoreBooks = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      const newBooks = books.slice(0, nextPage * booksPerPage);
      setDisplayedBooks(newBooks);
      setPage(nextPage);
      setHasMore(newBooks.length < books.length);

      if (newBooks.length >= books.length) {
        setAllBooksLoadedMessage(true);
        setTimeout(() => setAllBooksLoadedMessage(false), 3000);
      }

      setLoadingMore(false);
    }
  }, [books, hasMore, loadingMore, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
        hasMore &&
        !loadingMore
      ) {
        loadMoreBooks();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, loadMoreBooks]);

  const handleBookClick = (book: any) => setSelectedBook(book);

  const handleCloseModal = () => setSelectedBook(null);

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
        {loading && <LoadingSpinner />}
        {error && <p>{error}</p>}
        {!loading && books.length === 0 && <p>Nenhum livro encontrado.</p>}

        <BookGrid books={displayedBooks} onBookClick={handleBookClick} />
      </section>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={handleCloseModal}
          onEdit={handleEditBook}  
          onDelete={handleDeleteBook} 
        />
      )}

      {allBooksLoadedMessage && (
        <div className={styles.allBooksLoadedMessage}>
          <p>Todos os livros foram carregados.</p>
        </div>
      )}
    </div>
  );
};

export default MyBooks;