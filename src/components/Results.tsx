import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { IResults } from './Movies';

import Result from './Result';

interface Props {
  movies: IResults[];
  chooseMovie: (id: string) => void;
}

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(30rem, 1fr))',
    justifyItems: 'center'
  }
});

const Results = (props: Props) => {
  const { movies, chooseMovie } = props;
  const [animateCard, setAnimateCard] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  return (
    <section className={classes.grid}>
      {movies.map(movie => (
        <Result
          key={movie.imdbID}
          animateCard={animateCard}
          movie={movie}
          chooseMovie={chooseMovie}
        />
      ))}
    </section>
  );
};

export default Results;
