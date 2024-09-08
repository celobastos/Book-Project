import React, { useState } from 'react';
import styles from './AddBookForm.module.css';

interface AddBookFormProps {
  onSubmit: (bookData: { title: string; author: string; description: string }) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({ author: '', description: '' });

  // Validação de tipo de entrada
  const validateAuthor = (author: string) => /^[a-zA-Z\s]+$/.test(author);
  const validateDescription = (description: string) => description.length <= 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { author: '', description: '' };

    // Validações
    if (!validateAuthor(author)) {
      newErrors.author = 'O nome do autor deve conter apenas letras.';
      isValid = false;
    }

    if (!validateDescription(description)) {
      newErrors.description = 'A resenha não pode ter mais de 500 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onSubmit({ title, author, description });

      setTitle('');
      setAuthor('');
      setDescription('');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  return (
    <section className={styles.addBookSection}>
      <h2>Adicione um livro</h2>
      <form onSubmit={handleSubmit} className={styles.addBookForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Digite o nome do autor"
            required
          />
          {errors.author && <p className={styles.error}>{errors.author}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Resenha</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite sua resenha sobre o livro"
            rows={4}
            maxLength={500} 
            required
          />
          {errors.description && <p className={styles.error}>{errors.description}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {showSuccessMessage && (
        <div className={styles.successMessage}>
          Livro adicionado com sucesso!
        </div>
      )}
    </section>
  );
};

export default AddBookForm;
