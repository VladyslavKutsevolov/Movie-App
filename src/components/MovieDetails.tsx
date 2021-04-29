import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { apiURL, IMovies } from '../App';
import AlertComponent from './Alert';

const useStyles = makeStyles({
  root: {
    margin: '2rem',
    padding: '1rem',
    backgroundColor: '#454545'
  },
  poster: {
    flexBasis: '20%'
  },
  movieDescription: {
    flexBasis: '70%',
    color: '#fff',
    padding: '0 1rem'
  },
  movieDetails: {
    flexDirection: 'column'
  },
  genre: {
    backgroundColor: '#fff',
    color: '#454545',
    padding: '.5rem',
    marginRight: '.5rem',
    marginTop: '1rem',
    borderRadius: '10px'
  },
  body1: {
    marginTop: '1rem'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  genreTitle: {
    marginBottom: '.7rem'
  },
  plot: {
    marginTop: '3rem'
  },
  backToSearch: {
    display: 'flex',
    justifyContent: 'flex-end',
    justifyItems: 'center'
  },
  buttonBack: {
    background: '#F29E18',
    margin: '1rem 1rem 0 0',
    '&:hover': {
      background: '#c17b0b'
    }
  },
  back: {
    color: '#fff',
    textDecoration: 'none'
  },
  star: {
    color: '#F29E18'
  }
});

export interface IMovie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: any[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRaring: string;
  imdnVotes: string;
}

interface Props {
  addToFavorite: (movie: IMovie) => void;
  removeFormFavorite: (id: string) => void;
  favMovies: IMovies[];
  loading: boolean;
  error: { msg: string };
  setError: (prev: any) => void;
  setLoading: (v: (prev: boolean) => boolean) => void;
}

const MovieDetails = (props: Props) => {
  const {
    addToFavorite,
    removeFormFavorite,
    favMovies,
    error,
    setError,
    loading,
    setLoading
  } = props;
  const [movie, setMovie] = useState<IMovie>({
    Actors: '',
    Awards: '',
    BoxOffice: '',
    Country: '',
    DVD: '',
    Director: '',
    Genre: '',
    Language: '',
    Metascore: '',
    Plot: '',
    Poster: '',
    Production: '',
    Rated: '',
    Ratings: [],
    Released: '',
    Response: '',
    Runtime: '',
    Title: '',
    Type: '',
    Website: '',
    Writer: '',
    Year: '',
    imdbID: '',
    imdbRaring: '',
    imdnVotes: ''
  });
  const isFavorite = favMovies.find(m => m.imdbID === movie.imdbID);

  const classes = useStyles();
  const movieId = useLocation().pathname.split('=')[1];

  useEffect(() => {
    setLoading(prev => !prev);
    setError({ msg: '' });
    const openMovieDetails = async (id: string) => {
      try {
        const { data } = await axios.get(`${apiURL}&i=${id}`);
        if (data.Error) {
          setLoading(prev => !prev);
          setError({ msg: data.Error });
          return;
        }
        setMovie(data);

        setLoading(prev => !prev);
        setError({ msg: '' });
      } catch (e) {
        setLoading(prev => !prev);
        setError({ msg: e.message });
      }
    };
    openMovieDetails(movieId);
  }, []);

  const pushToLocalStorage = useCallback(() => {
    console.log('fire event');
    localStorage.setItem('favorite-movies', JSON.stringify(favMovies));
  }, [favMovies.length]);

  useEffect(() => {
    pushToLocalStorage();
  }, [favMovies.length]);

  if (loading && !error.msg) {
    return <AlertComponent message="Loading" type="info" />;
  }

  return (
    <section>
      {error.msg && <AlertComponent message={error.msg} type="error" />}
      {movie.Title ? (
        <>
          {' '}
          <div className={classes.backToSearch}>
            <Button
              className={classes.buttonBack}
              variant="contained"
              color="primary"
            >
              <Link className={classes.back} to="/">
                Back to Search
              </Link>
            </Button>
          </div>
          <div className={classes.root}>
            <Grid container>
              <Grid item className={classes.poster}>
                <img src={movie.Poster} alt="movie" />
              </Grid>
              <Grid item className={classes.movieDescription}>
                <Typography variant="h3" component="h2">
                  {movie.Title}
                  {isFavorite ? (
                    <StarIcon
                      className={classes.star}
                      onClick={() => removeFormFavorite(movie.imdbID)}
                    />
                  ) : (
                    <StarBorderIcon
                      className={classes.star}
                      onClick={() => addToFavorite(movie)}
                    />
                  )}
                </Typography>
                <Typography variant="body1" component="p">
                  <b>Rated:</b> {movie.Rated}
                </Typography>
                <Grid container className={classes.movieDetails}>
                  <Grid item>
                    <Typography
                      className={classes.body1}
                      variant="body1"
                      component="span"
                    >
                      <b>Release Date:</b> {movie.Released}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" component="span">
                      <b>Director:</b>
                      {movie.Director}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" component="span">
                      <b>Runtime:</b> {movie.Runtime}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" component="span">
                      <b>Production:</b> {movie.Production}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  className={classes.genreTitle}
                  variant="body1"
                  component="p"
                >
                  <b>Genres:</b>{' '}
                </Typography>
                <Typography variant="body1" component="p">
                  {movie.Genre.replace(/,/g, '')
                    .split(' ')
                    .map(genre => (
                      <span className={classes.genre} key={genre}>
                        {genre}
                      </span>
                    ))}
                </Typography>
                <Typography
                  className={classes.plot}
                  variant="body1"
                  component="p"
                >
                  {movie.Plot}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default MovieDetails;
