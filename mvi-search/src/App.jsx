import React from 'react';
import MovieSearch from './components/MovieSearch';
import Navbar from './components/Navbar';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <MovieSearch />
    </ThemeProvider>
  );
}

export default App;