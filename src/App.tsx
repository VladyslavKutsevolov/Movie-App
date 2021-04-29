import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from '@material-ui/core';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import FavMovies from './components/FavMovies';
import MovieDetails, { IMovie } from './components/MovieDetails';
import HeroSection from './components/HeroSection';

export interface IMovies {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface IState {
  search: string;
  movies: IMovies[];
}

export interface FavMovie {
  movies: IMovies[];
}

export const apiURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

function App() {
  const [moviesPerPage] = useState<number>(6);
  const [slideSearch, setSlideSearch] = useState<boolean>(false);
  const [state, setState] = useState<IState>({
    search: '',
    movies: []
  });
  const [favMovies, setFavMovies] = useState<FavMovie>({
    movies: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ msg: string }>({
    msg: ''
  });

  const addToFavorite = (movie: IMovie) => {
    setFavMovies(prev => ({
      movies: [...prev.movies, movie]
    }));
  };

  const removeFormFavorite = (id: string) => {
    setFavMovies(prev => ({
      movies: prev.movies.filter(movie => movie.imdbID !== id)
    }));
  };

  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/">
            <HeroSection />
          </Route>
          <Route path="/browse">
            <Movies
              loading={loading}
              error={error}
              setError={setError}
              setLoading={setLoading}
              moviesPerPage={moviesPerPage}
              state={state}
              setState={setState}
              slideSearch={slideSearch}
              setSlideSearch={setSlideSearch}
              favMovies={favMovies}
              setFavMovies={setFavMovies}
              addToFavorite={addToFavorite}
              removeFormFavorite={removeFormFavorite}
            />
          </Route>
          <Route path="/favorite">
            <FavMovies moviesPerPage={moviesPerPage} />
          </Route>

          <Route path="/movie/:id">
            <MovieDetails
              addToFavorite={addToFavorite}
              removeFormFavorite={removeFormFavorite}
              favMovies={favMovies.movies}
              loading={loading}
              error={error}
              setError={setError}
              setLoading={setLoading}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
