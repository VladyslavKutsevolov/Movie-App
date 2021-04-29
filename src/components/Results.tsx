import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  moviesPerPage: number;
}

const Results = (props: Props) => {
  const { movies } = props;
  const [animateCard, setAnimateCard] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  return (
    <section>
      <div className={classes.grid}>
        {movies.map(movie => (
          <Link key={movie.imdbID} to={`/movie/id=${movie.imdbID}`}>
            <Result animateCard={animateCard} movie={movie} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Results;
