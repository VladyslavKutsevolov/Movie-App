import React from 'react';
import { IResults } from './Movies';
import Result from './Result';

interface Props {
  movies: IResults[];
  chooseMovie: (id: string) => void;
}

const Results = (props: Props) => {
  const { movies, chooseMovie } = props;

  return (
    <section>
      {movies.map(movie => (
        <Result key={movie.imdbID} movie={movie} chooseMovie={chooseMovie} />
      ))}
    </section>
  );
};

export default Results;
