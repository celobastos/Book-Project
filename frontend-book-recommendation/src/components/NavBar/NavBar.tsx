import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/E-stante.svg';
import SearchBar from '../SearchBar/SearchBar';
import { getBooks } from '../../services/booksService'; // Importa a função para buscar os livros

const NavBar: React.FC<{ onBookClick: (book: any) => void }> = ({ onBookClick }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]); // Armazena os resultados da pesquisa
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      const results = await getBooks(query); // Realiza a busca dos livros
      setSearchResults(results); // Define os resultados
      setShowDropdown(true); // Exibe o dropdown com os resultados
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleBookClick = (book: any) => {
    onBookClick(book); 
    setShowDropdown(false); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><Link to="/my-books">Meus Livros</Link></li>
          <li><Link to="/google-books">Google Books</Link></li>
        </ul>

        <div className={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} />
          {showDropdown && searchResults.length > 0 && (
            <ul className={styles.dropdown}>
              {searchResults.map((book) => (
                <li
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                  className={styles.dropdownItem}
                >
                  {book.title} - {book.author}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
