import React from 'react';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

interface IMovie {
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
  movie: IMovie;
  close: () => void;
}

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
    color: '#fff'
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
    margin: '1rem 1rem 0 0'
  }
});

const MovieDetails = (props: Props) => {
  const { movie, close } = props;
  const classes = useStyles();

  return (
    <section>
      <div className={classes.backToSearch}>
        <Button
          className={classes.buttonBack}
          variant="contained"
          color="primary"
          onClick={close}
        >
          Back to Search
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
            <Typography className={classes.plot} variant="body1" component="p">
              {movie.Plot}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default MovieDetails;
