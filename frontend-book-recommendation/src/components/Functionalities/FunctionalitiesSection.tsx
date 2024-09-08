import React from 'react';
import styles from './FunctionalitiesSection.module.css'; 

const FunctionalitiesSection: React.FC = () => {
  return (
    <section className={styles.functionalitiesSection}>
      <h2 className={styles.title}>Funcionalidades</h2>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <div className={styles.iconContainer}>
            <i className="fas fa-book"></i> 
          </div>
          <h3>Adicione e salve um livro que você leu</h3>
          <p>Adicione e mantenha um registro de todos os livros que você leu com facilidade.</p>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.iconContainer}>
            <i className="fas fa-info-circle"></i> 
          </div>
          <h3>Veja os detalhes sobre os seus livros</h3>
          <p>Veja informações detalhadas sobre seus livros, como título, autor e data de leitura.</p>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.iconContainer}>
            <i className="fas fa-search"></i> 
          </div>
          <h3>Pesquise as avaliações do Google de um livro</h3>
          <p>Pesquise e veja as avaliações do Google Books para descobrir a opinião de outros leitores.</p>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.iconContainer}>
            <i className="fas fa-archive"></i> 
          </div>
          <h3>Veja o repositório de seus livros</h3>
          <p>Acesse rapidamente o repositório de todos os livros que você leu ao longo do tempo.</p>
        </div>
      </div>
    </section>
  );
};

export default FunctionalitiesSection;
