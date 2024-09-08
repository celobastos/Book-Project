import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/E-stante.svg';
import SearchBar from '../SearchBar/SearchBar';
import { getBooks } from '../../services/booksService';

const NavBar: React.FC<{ onBookClick: (book: any) => void }> = ({ onBookClick }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [noResults, setNoResults] = useState(false); 
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    try {
      const results = await getBooks(query);
      setSearchResults(results);
      setNoResults(results.length === 0); 
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleBookClick = (book: any) => {
    onBookClick(book);
    setShowDropdown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        <div className={styles.searchContainer} ref={searchContainerRef}>
          <SearchBar onSearch={handleSearch} />
          {showDropdown && (
            <ul className={styles.dropdown}>
              {noResults ? (
                <li className={styles.noResults}>Nenhum resultado encontrado</li>
              ) : (
                searchResults.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className={styles.dropdownItem}
                  >
                    {book.title} - {book.author}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
