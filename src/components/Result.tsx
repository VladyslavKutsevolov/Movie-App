import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grow,
  makeStyles,
  Typography
} from '@material-ui/core';

import { IMovies } from '../App';

const useStyles = makeStyles({
  root: {
    width: '20em',
    margin: 'auto'
  },
  img: {
    height: 400,
    backgroundSize: 'cover'
  },
  title: {
    width: '15em',
    textAlign: 'center',
    color: '#fff',
    marginBottom: '1em',
    marginTop: '1rem'
  }
});

interface Props {
  movie: IMovies;
  chooseMovie: (id: string) => void;
  animateCard: boolean;
}

const Result = (props: Props) => {
  const { movie, chooseMovie, animateCard } = props;
  const classes = useStyles();
  return (
    <Grow in={animateCard}>
      <div>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.img}
              image={movie.Poster}
              component="img"
              title="movie"
              onClick={() => chooseMovie(movie.imdbID)}
            />
          </CardActionArea>
        </Card>
        <Typography className={classes.title} variant="h6" component="p">
          {movie.Title} ({movie.Year})
        </Typography>
      </div>
    </Grow>
  );
};

export default Result;
