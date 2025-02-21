import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <AppBar position="sticky" className={styles.navbar} sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)' }}>
      <Toolbar className={styles.toolbar}>
        <div className={styles.logoSection}>
          <MovieIcon className={styles.icon} />
          <Typography variant="h5" className={styles.title}>
            Movie Search App
          </Typography>
        </div>
        <div className={styles.navLinks}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Popular</Button>
          <Button color="inherit">Top Rated</Button>
          <Button color="inherit">Upcoming</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;