import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Results from './Results';
import MovieDetails from './MovieDetails';

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
  const [state, setState] = useState<IState>({
    search: '',
    movies: [],
    selected: {}
  });
  const [movieDetails, setMovieDetails] = useState<boolean>(false);

  const apiURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

  const handleSearchInput = ({ target }: ChangeEvent<{ value: string }>) => {
    setState(prevState => ({ ...prevState, search: target.value }));
  };

  const onSearch = async (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      try {
        const { data } = await axios.get(`${apiURL}&s=${state.search}`);
        setState({ ...state, movies: data.Search });
      } catch (e) {
        console.log('err', e);
      }
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
      console.log('openMovieDetails', data);
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

  return (
    <div>
      <Search
        value={state.search}
        onChange={handleSearchInput}
        search={onSearch}
      />

      {movieDetails ? (
        <MovieDetails movie={state.selected} close={closeMovieDetails} />
      ) : (
        <Results movies={state.movies} chooseMovie={openMovieDetails} />
      )}
    </div>
  );
};

export default Movies;
