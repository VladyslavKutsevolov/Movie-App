import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grow,
  makeStyles
} from '@material-ui/core';

import { IResults } from './Movies';

interface Props {
  movie: IResults;
  chooseMovie: (id: string) => void;
  animateCard: boolean;
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
  const { movie, chooseMovie, animateCard } = props;
  const classes = useStyles();
  return (
    <Grow in={animateCard}>
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
    </Grow>
  );
};

export default Result;
