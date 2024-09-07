import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getBooks } from '../services/booksService';
import NavBar from '../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import styles from '../styles/MyBooks.module.css';

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // To track pagination
  const [hasMore, setHasMore] = useState<boolean>(true); // To track if more books are available

  const observer = useRef<IntersectionObserver | null>(null); // Ref for IntersectionObserver

  // Fetch books based on the current page
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBooks(`?page=${page}`); // Pass the page query
      setBooks(prevBooks => [...prevBooks, ...data]); // Append new books to the current list
      if (data.length === 0) {
        setHasMore(false); // If no more books, stop loading
      }
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // IntersectionObserver to detect the last book card
  const lastBookElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (loading) return; // Don't attach observer while loading
    if (!hasMore) return; // If no more books, stop observing

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1); // Load more books when the last element is visible
      }
    };

    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastBookElementRef.current) {
      observer.current.observe(lastBookElementRef.current); // Observe the last book
    }

    return () => {
      if (observer.current) observer.current.disconnect(); // Clean up the observer
    };
  }, [loading, hasMore]);

  return (
    <div className={styles.container}>
      <NavBar />

      <section className={styles.bookSection}>
        <h1 className={styles.title}>My Book Collection</h1>
        {loading && page === 1 ? ( // Only show "Loading" on the first load
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.booksGrid}>
            {books.map((book, index) => (
              <div
                key={book.id}
                ref={index === books.length - 1 ? lastBookElementRef : null} // Attach the observer to the last book
              >
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <Link to={`/books/${book.id}`} className={styles.bookCard}>
                  <img src="/path-to-book-cover-icon.png" alt={book.title} className={styles.bookIcon} />
                </Link>
              </div>
            ))}
          </div>
        )}
        {loading && page > 1 && <p>Loading more books...</p>} {/* Show loading while fetching more books */}
        {!hasMore && <p>No more books to load.</p>} {/* Message when no more books are available */}
      </section>
    </div>
  );
};

export default MyBooks;
