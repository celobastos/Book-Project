import React, { useState } from 'react';
import styles from './AddBookForm.module.css';

interface AddBookFormProps {
  onSubmit: (bookData: { title: string; author: string; description: string }) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // For success message

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title && author && description) {
      onSubmit({ title, author, description });

      // Reset fields
      setTitle('');
      setAuthor('');
      setDescription('');

      // Show success message
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  return (
    <section className={styles.addBookSection}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className={styles.addBookForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
            rows={4}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Success message */}
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          Book added successfully!
        </div>
      )}
    </section>
  );
};

export default AddBookForm;
