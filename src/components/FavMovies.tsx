import React, { useEffect, useState } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import { makeStyles, Typography } from '@material-ui/core';
import Results from './Results';
import { IMovies } from '../App';
import AlertComponent from './Alert';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    color: '#fff',
    margin: '1rem 0'
  }
});

interface Props {
  moviesPerPage: number;
}

const FavMovies = (props: Props) => {
  const { moviesPerPage } = props;
  const [favMovies, setFavMovies] = useState<IMovies[]>([]);

  const classes = useStyles();

  useEffect(() => {
    const movieData = localStorage.getItem('favorite-movies');
    if (movieData) {
      const movies = JSON.parse(movieData);

      setFavMovies(movies);
    }
  }, []);

  if (!favMovies.length) {
    return (
      <Typography className={classes.title} variant="h5" component="p">
        There is no favorite movies
      </Typography>
    );
  }

  return (
    <div>
      <Typography className={classes.title} variant="h2" component="h1">
        Favorite Movies
      </Typography>
      <Results movies={favMovies} moviesPerPage={moviesPerPage} />
    </div>
  );
};

export default withAuthenticationRequired(FavMovies, {
  onRedirecting: () => <AlertComponent message="loading" type="info" />,
  loginOptions: {
    redirectUri: 'http://localhost:3000/browse'
  }
});
