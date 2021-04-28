import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import { IResults } from './Movies';

const useStyles = makeStyles({
  pagination: {
    margin: '1rem auto',
    color: '#fff'
  },
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff'
    }
  }
});

interface Props {
  movies: IResults[];
  moviesPerPage: number;
  page: number;
  setPage: (page: number) => void;
}

const MoviePagination = (props: Props) => {
  const classes = useStyles();
  const { movies, moviesPerPage, page, setPage } = props;
  const count = Math.ceil(movies.length / moviesPerPage);

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={classes.pagination}>
      <Pagination
        className={classes.ul}
        count={count}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default MoviePagination;
