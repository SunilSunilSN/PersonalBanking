import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>My Personal Banking Application</h1>
      <nav>
        <ul style={styles.navList}>
          <li><a href="/" style={styles.navItem}>Home</a></li>
          <li><a href="/about" style={styles.navItem}>About</a></li>
          <li><a href="/contact" style={styles.navItem}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '1rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
  }
};

export default Header;
