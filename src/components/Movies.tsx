import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import Search from './Search';
import Results from './Results';
import { IMovie } from './MovieDetails';
import Pagination from './Pagination';
import { apiURL, FavMovie, IMovies, IState } from '../App';
import AlertComponent from './Alert';

const useStyles = makeStyles({
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

interface Props {
  state: IState;
  loading: boolean;
  error: { msg: string };
  setError: (prev: any) => void;
  setLoading: (v: (prev: boolean) => boolean) => void;
  setState: (props: any) => void;
  moviesPerPage: number;
  slideSearch: boolean;
  setSlideSearch: (v: boolean) => void;
  setFavMovies: (movie: (prev: FavMovie) => { movies: IMovies[] }) => void;
  favMovies: FavMovie;
  addToFavorite: (movie: IMovie) => void;
  removeFormFavorite: (id: string) => void;
}

let redirectURI: string;

if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_AUTH0_REDIRECT_URI) {
    redirectURI = process.env.REACT_APP_AUTH0_REDIRECT_URI;
  }
} else {
  redirectURI = 'http://localhost:3000/browse';
}

const Movies = (props: Props) => {
  const {
    state,
    setState,
    moviesPerPage,
    slideSearch,
    setSlideSearch,
    setLoading,
    error,
    setError
  } = props;
  const classes = useStyles();
  const [page, setPage] = useState<number>(1);

  const handleSearchInput = ({ target }: ChangeEvent<{ value: string }>) => {
    setState((prevState: any) => ({ ...prevState, search: target.value }));
  };

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();

    setPage(1);
    setLoading(prev => !prev);
    setError({ msg: '' });

    try {
      const { data } = await axios.get(`${apiURL}&s=${state.search}`);

      if (data.Error) {
        setLoading(prev => !prev);
        setError({ msg: data.Error });
        setState({ ...state, movies: [], search: '' });
        setSlideSearch(false);
        return;
      }

      setSlideSearch(true);
      setState({ ...state, movies: data.Search || [], search: '' });

      setLoading(prev => !prev);
      setError({ msg: '' });
    } catch (e) {
      setLoading(prev => !prev);
      setError({ msg: e.message });
    }
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
        <Search
          value={state.search}
          onChange={handleSearchInput}
          search={onSearch}
          slideSearch={slideSearch}
        />
        {error.msg && <AlertComponent message={error.msg} type="error" />}
      </div>

      <div className={classes.results}>
        <Results moviesPerPage={moviesPerPage} movies={currMoviesPage} />
        {state.movies.length ? (
          <Pagination
            page={page}
            setPage={setPage}
            movies={state.movies}
            moviesPerPage={moviesPerPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Movies, {
  onRedirecting: () => <AlertComponent message="loading" type="info" />
});
