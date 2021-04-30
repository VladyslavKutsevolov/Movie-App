import React, { ChangeEvent } from 'react';
import {
  createStyles,
  InputAdornment,
  makeStyles,
  TextField,
  Theme
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '4px'
    },
    form: {
      width: '60%',
      [theme.breakpoints.down('sm')]: {
        width: '90%'
      }
    },
    textFieldSection: {
      marginTop: '20rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        marginTop: '10rem'
      }
    },
    slideUp: {
      marginTop: '3rem',
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transaction: 'all 1s ease-in-out'
    },
    searchIcon: {
      position: 'absolute'
    }
  })
);

interface IProps {
  value: string;
  onChange: (val: ChangeEvent<{ value: string }>) => void;
  search: (e: any) => void;
  slideSearch: boolean;
}

const Search = (props: IProps) => {
  const { onChange, value, search, slideSearch } = props;
  const classes = useStyles();

  return (
    <section
      className={slideSearch ? classes.slideUp : classes.textFieldSection}
    >
      <form onSubmit={search} className={classes.form}>
        <TextField
          required
          variant="outlined"
          placeholder="Search for a movie"
          value={value}
          onChange={onChange}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </form>
    </section>
  );
};

export default Search;
