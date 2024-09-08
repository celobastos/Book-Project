import React, { useState } from 'react';
import styles from './BookDetailModal.module.css';
import noDataImage from '../../assets/noData.png';

interface BookDetailModalProps {
  book: any;
  onClose: () => void;
  onEdit: (updatedBook: { title: string; author: string; review: string }) => void;
  onDelete: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedReview, setEditedReview] = useState(book.review);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSave = () => {
    onEdit({ title: editedTitle, author: editedAuthor, review: editedReview });

   
    setShowSuccessMessage(true);
    
    
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <div className={styles.modalBody}>
          <div className={styles.bookImageContainer}>
            <img
              src={book.coverImage || noDataImage}
              alt={book.title}
              className={styles.bookImage}
            />
          </div>
          <div className={styles.bookDetails}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className={styles.inputField}
                  placeholder="Título do livro"
                />
                <input
                  type="text"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                  className={styles.inputField}
                  placeholder="Autor do livro"
                />
                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className={styles.textAreaField}
                  placeholder="Resenha do livro"
                />
              </>
            ) : (
              <>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.bookAuthor}><strong>Author:</strong> {book.author}</p>
                <p className={styles.bookReview}><strong>Review:</strong> {book.review || 'Sem resenha disponível.'}</p>
              </>
            )}
          </div>
        </div>

        <div className={styles.modalActions}>
          {isEditing ? (
            <>
              <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
              <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancelar</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className={styles.editButton}>Editar</button>
              <button onClick={onDelete} className={styles.deleteButton}>Deletar</button>
            </>
          )}
        </div>

        {showSuccessMessage && (
          <div className={styles.successMessage}>Livro atualizado com sucesso!</div>
        )}
      </div>
    </div>
  );
};

export default BookDetailModal;
