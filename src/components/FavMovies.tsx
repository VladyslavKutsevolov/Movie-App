import React, { useEffect, useState } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Results from './Results';
import { IMovies } from '../App';
import AlertComponent from './Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      color: '#fff',
      margin: '1rem 0',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem'
      }
    },
    back: {
      color: '#fff',
      marginTop: '1rem',
      '&:hover': {
        color: '#FBAB7E'
      }
    }
  })
);

interface Props {
  moviesPerPage: number;
}

const FavMovies = (props: Props) => {
  const { moviesPerPage } = props;
  const [favMovies, setFavMovies] = useState<IMovies[]>([]);
  const history = useHistory();

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
      <>
        <div>
          <Button className={classes.back} onClick={() => history.goBack()}>
            <ChevronLeftIcon />
            BACK
          </Button>
        </div>
        <Typography className={classes.title} variant="h5" component="p">
          There is no favorite movies
        </Typography>
      </>
    );
  }

  return (
    <div>
      <div>
        <Button className={classes.back} onClick={() => history.goBack()}>
          <ChevronLeftIcon />
          BACK
        </Button>
      </div>
      <Typography className={classes.title} variant="h2" component="h1">
        Favorite Movies
      </Typography>
      <Results movies={favMovies} moviesPerPage={moviesPerPage} />
    </div>
  );
};

export default withAuthenticationRequired(FavMovies, {
  onRedirecting: () => <AlertComponent message="loading" type="info" />
});
