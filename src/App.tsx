import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { Container } from '@material-ui/core';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import FavMovies from './components/FavMovies';

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
  selected: any;
}

export interface FavMovie {
  movies: IMovies[];
}

function App() {
  const [moviesPerPage] = useState<number>(6);
  const [movieDetails, setMovieDetails] = useState<boolean>(false);
  const [slideSearch, setSlideSearch] = useState<boolean>(false);
  const [state, setState] = useState<IState>({
    search: '',
    movies: [],
    selected: {}
  });

  const [favMovies, setFavMovies] = useState<FavMovie>({
    movies: []
  });

  const apiURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

  const openMovieDetails = async (id: string) => {
    try {
      const { data } = await axios.get(`${apiURL}&i=${id}`);
      setState({
        ...state,
        selected: data
      });

      setMovieDetails(prev => !prev);
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/">
            <Movies
              apiURL={apiURL}
              movieDetails={movieDetails}
              setMovieDetails={setMovieDetails}
              moviesPerPage={moviesPerPage}
              state={state}
              setState={setState}
              openMovieDetails={openMovieDetails}
              slideSearch={slideSearch}
              setSlideSearch={setSlideSearch}
              favMovies={favMovies}
              setFavMovies={setFavMovies}
            />
          </Route>
          <Route path="/favorite">
            <FavMovies
              moviesPerPage={moviesPerPage}
              chooseMovie={openMovieDetails}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
