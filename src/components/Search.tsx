import React, { ChangeEvent } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '60%'
      }
    }
  })
);

interface IProps {
  value: string;
  onChange: (val: ChangeEvent<{ value: string }>) => void;
  search: (e: any) => void;
}

const Search = (props: IProps) => {
  const { onChange, value, search } = props;
  const classes = useStyles();

  return (
    <section>
      <TextField
        variant="outlined"
        type="text"
        placeholder="Search for a movie"
        value={value}
        onChange={onChange}
        onKeyPress={search}
      />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </section>
  );
};

export default Search;
