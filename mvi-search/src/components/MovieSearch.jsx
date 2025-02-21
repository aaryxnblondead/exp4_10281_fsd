import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import axios from 'axios';
import styles from './MovieSearch.module.css';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const API_KEY = 'd2f4f93a'; // Replace with your API key

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className={styles.searchContainer} style={{ minHeight: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <Container style={{ height: '100%', maxWidth: '100%', padding: '20px' }}>
        <h1 className={styles.searchTitle}>Movie Search App</h1>
        <div className={styles.searchBox}>
          <TextField
            className={styles.searchInput}
            label="Search Movies"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiInputBase-input': { color: '#ffffff' },
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            sx={{
              backgroundColor: '#e50914',
              '&:hover': { backgroundColor: '#f40612' },
            }}
          >
            Search
          </Button>
        </div>
        
        <Grid container spacing={3} className={styles.movieGrid}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <Card className={styles.movieCard}>
                <CardMedia
                  component="img"
                  className={styles.posterImage}
                  image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                  alt={movie.Title}
                />
                <CardContent className={styles.movieInfo}>
                  <Typography className={styles.movieTitle}>
                    {movie.Title}
                  </Typography>
                  <div className={styles.movieMeta}>
                    <span>{movie.Year}</span>
                    <span>{movie.Type}</span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default MovieSearch;