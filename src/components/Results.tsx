import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { IMovies } from '../App';

import Result from './Result';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
    justifyItems: 'center'
  }
});

interface Props {
  movies: IMovies[];
  chooseMovie: (id: string) => void;
  moviesPerPage: number;
}

const Results = (props: Props) => {
  const { movies, chooseMovie } = props;
  const [animateCard, setAnimateCard] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  return (
    <section>
      <div className={classes.grid}>
        {movies.map(movie => (
          <Result
            key={movie.imdbID}
            animateCard={animateCard}
            movie={movie}
            chooseMovie={chooseMovie}
          />
        ))}
      </div>
    </section>
  );
};

export default Results;
