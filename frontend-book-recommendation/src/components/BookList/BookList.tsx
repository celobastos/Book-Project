import React from 'react';
import styles from './BookList.module.css';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: string;
  image: string;
}

interface BookListProps {
  books: Book[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onUpdate, onDelete }) => {
  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <div key={book.id} className={styles.bookItem}>
          <img src={book.image} alt={book.title} className={styles.bookImage} />
          <div className={styles.bookDetails}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.price}</p>
            <button onClick={() => onUpdate(book.id)}>Update</button>
            <button onClick={() => onDelete(book.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
