import React, { useEffect, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import Results from './Results';
import { IMovies } from '../App';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    color: '#fff',
    margin: '1rem 0'
  }
});

interface Props {
  chooseMovie: (id: string) => void;
  moviesPerPage: number;
}

const FavMovies = (props: Props) => {
  const { chooseMovie, moviesPerPage } = props;
  const [favMovies, setFavMovies] = useState<IMovies[]>([]);

  const classes = useStyles();

  useEffect(() => {
    const movieData = localStorage.getItem('favorite-movies');
    if (movieData) {
      const { movies } = JSON.parse(movieData);

      setFavMovies(movies);
    }
  }, []);

  return (
    <div>
      <Typography className={classes.title} variant="h2" component="h1">
        Favorite Movies
      </Typography>
      <Results
        movies={favMovies}
        chooseMovie={chooseMovie}
        moviesPerPage={moviesPerPage}
      />
    </div>
  );
};

export default FavMovies;
