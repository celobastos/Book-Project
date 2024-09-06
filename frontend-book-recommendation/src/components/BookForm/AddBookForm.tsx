import React, { useState } from 'react';
import styles from './AddBookForm.module.css';

interface AddBookFormProps {
  onSubmit: (title: string, author: string, description: string) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author) {
      onSubmit(title, author, description);
      // Clear form after submission
      setTitle('');
      setAuthor('');
      setDescription('');
    }
  };

  return (
    <section className={styles.addBookSection}>
      <h2>Add a New Book</h2>
      <form className={styles.addBookForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="bookTitle">Title</label>
          <input
            type="text"
            id="bookTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bookAuthor">Author</label>
          <input
            type="text"
            id="bookAuthor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bookDescription">Description</label>
          <textarea
            id="bookDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Book
        </button>
      </form>
    </section>
  );
};

export default AddBookForm;
