import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';

import Search from './Search';
import Results from './Results';
import MovieDetails from './MovieDetails';
import Pagination from './Pagination';
import { FavMovie, IMovies, IState } from '../App';

const useStyles = makeStyles({
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

interface Props {
  state: IState;
  setState: (props: any) => void;
  apiURL: string;
  setMovieDetails: (val: (prev: boolean) => boolean) => void;
  moviesPerPage: number;
  movieDetails: boolean;
  openMovieDetails: (id: string) => void;
  slideSearch: boolean;
  setSlideSearch: (v: boolean) => void;
  setFavMovies: (movie: (prev: FavMovie) => { movies: IMovies[] }) => void;
  favMovies: FavMovie;
}

const Movies = (props: Props) => {
  const {
    state,
    setState,
    apiURL,
    setMovieDetails,
    moviesPerPage,
    movieDetails,
    openMovieDetails,
    slideSearch,
    setSlideSearch,
    favMovies,
    setFavMovies
  } = props;
  const classes = useStyles();
  const [page, setPage] = useState<number>(1);

  const handleSearchInput = ({ target }: ChangeEvent<{ value: string }>) => {
    setState((prevState: any) => ({ ...prevState, search: target.value }));
  };

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    setSlideSearch(true);
    setPage(1);
    try {
      const { data } = await axios.get(`${apiURL}&s=${state.search}`);
      setState({ ...state, movies: data.Search || [], search: '' });
    } catch (e) {
      console.log('err', e);
    }
  };

  const addToFavorite = () => {
    if (state.selected) {
      setFavMovies(prev => ({
        movies: [...prev.movies, state.selected]
      }));
    }
  };

  const removeFormFavorite = (id: string) => {
    setFavMovies(prev => ({
      movies: prev.movies.filter(movie => movie.imdbID !== id)
    }));
  };

  const closeMovieDetails = () => {
    setState({
      ...state,
      selected: {}
    });
    setMovieDetails(prev => !prev);
  };

  const pushToLocalStorage = useCallback(() => {
    console.log('fire local');
    localStorage.setItem('favorite-movies', JSON.stringify(favMovies));
  }, [favMovies.movies.length]);

  useEffect(() => {
    pushToLocalStorage();
  }, [favMovies.movies.length]);

  const indexOfLastPage = page * moviesPerPage;
  const indexOfFirstPoster = indexOfLastPage - moviesPerPage;
  const currMoviesPage = state.movies.slice(
    indexOfFirstPoster,
    indexOfLastPage
  );
  console.log('movieDetails', movieDetails);

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
        <MovieDetails
          addToFavorite={addToFavorite}
          removeFormFavorite={removeFormFavorite}
          movie={state.selected}
          favMovies={favMovies.movies}
          close={closeMovieDetails}
        />
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
