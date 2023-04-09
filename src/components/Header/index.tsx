import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.button}>
        &lt; Вернуться к генерации QR
      </Link>
    </header>
  );
};

export default Header;
