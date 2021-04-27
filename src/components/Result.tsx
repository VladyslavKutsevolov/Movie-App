import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Grid
} from '@material-ui/core';

import { IResults } from './Movies';

interface Props {
  movie: IResults;
  chooseMovie: (id: string) => void;
}

const useStyles = makeStyles({
  root: {
    width: '20em',
    marginBottom: '1em',
    borderRadius: '15px'
  },
  img: {
    height: 400,
    backgroundSize: 'cover'
  }
});

const Result = (props: Props) => {
  const { movie, chooseMovie } = props;
  const classes = useStyles();
  return (
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
  );
};

export default Result;
