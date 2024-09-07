import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/E-stante.svg';

const NavBar: React.FC = () => {
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
          <input type="text" placeholder="Pesquise..." />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
