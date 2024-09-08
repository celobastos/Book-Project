import React from 'react';
import noDataImage from '../../assets/noData.png';
import styles from '../../styles/MyBooks.module.css';

interface BookGridProps {
  books: any[];
  onBookClick: (book: any) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onBookClick }) => {
  return (
    <div className={styles.booksGrid}>
      {books.map((book) => (
        <div key={book.id}>
          <h3 className={styles.bookTitle}>{book.title}</h3>
          <div
            className={styles.bookCard}
            onClick={() => onBookClick(book)}
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
  );
};

export default BookGrid;
