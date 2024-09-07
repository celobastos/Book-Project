import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/booksService';
import NavBar from '../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import styles from '../styles/MyBooks.module.css';

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
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

  return (
    <div className={styles.container}>
      <NavBar />

      <section className={styles.bookSection}>
        <h1 className={styles.title}>Minha Coleção de Livros</h1>
        {loading && <p>Carregando livros...</p>}
        {error && <p>{error}</p>}
        {!loading && books.length === 0 && <p>Nenhum livro encontrado.</p>}
        <div className={styles.booksGrid}>
          {books.map((book) => (
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
      </section>
    </div>
  );
};

export default MyBooks;
