import React from 'react';
import { IResults } from './Movies';

interface Props {
  movie: IResults;
  chooseMovie: (id: string) => void;
}

const Result = (props: Props) => {
  const { movie, chooseMovie } = props;
  return (
    <div>
      <img src={movie.Poster} alt="movie" />
      <h3>{movie.Title}</h3>
      <button type="button" onClick={() => chooseMovie(movie.imdbID)}>
        Details
      </button>
    </div>
  );
};

export default Result;
