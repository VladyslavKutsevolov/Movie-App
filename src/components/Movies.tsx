import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';

import Search from './Search';
import Results from './Results';
import MovieDetails from './MovieDetails';
import Pagination from './Pagination';

const useStyles = makeStyles({
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export interface IResults {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface IState {
  search: string;
  movies: IResults[];
  selected: any;
}

const Movies = () => {
  const classes = useStyles();
  const [state, setState] = useState<IState>({
    search: '',
    movies: [],
    selected: {}
  });
  const [movieDetails, setMovieDetails] = useState<boolean>(false);
  const [slideSearch, setSlideSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [moviesPerPage, setMoviesPerPage] = useState<number>(6);

  const apiURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

  const handleSearchInput = ({ target }: ChangeEvent<{ value: string }>) => {
    setState(prevState => ({ ...prevState, search: target.value }));
  };

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    setSlideSearch(true);
    try {
      const { data } = await axios.get(`${apiURL}&s=${state.search}`);
      setState({ ...state, movies: data.Search || [], search: '' });
    } catch (e) {
      console.log('err', e);
    }
  };

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

  const closeMovieDetails = () => {
    setState({
      ...state,
      selected: {}
    });
    setMovieDetails(prev => !prev);
  };

  const indexOfLastPage = page * moviesPerPage;
  const indexOfFirstPoster = indexOfLastPage - moviesPerPage;
  const currMoviesPage = state.movies.slice(
    indexOfFirstPoster,
    indexOfLastPage
  );

  return (
    <div>
      <div>
        {!movieDetails && (
          <Search
            value={state.search}
            onChange={handleSearchInput}
            search={onSearch}
            slideSearch={slideSearch}
          />
        )}
      </div>

      {movieDetails ? (
        <MovieDetails movie={state.selected} close={closeMovieDetails} />
      ) : (
        <div className={classes.results}>
          <Results
            moviesPerPage={moviesPerPage}
            movies={currMoviesPage}
            chooseMovie={openMovieDetails}
          />
          {state.movies.length ? (
            <Pagination
              page={page}
              setPage={setPage}
              movies={state.movies}
              moviesPerPage={moviesPerPage}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Movies;
