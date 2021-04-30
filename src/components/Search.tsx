import React, { ChangeEvent } from 'react';
import {
  createStyles,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import TheatersIcon from '@material-ui/icons/Theaters';

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
      marginTop: '15rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
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
      flexDirection: 'column',

      transaction: 'all 1s ease-in-out'
    },
    searchIcon: {
      position: 'absolute'
    },
    logo: {
      flexGrow: 1,
      color: '#fff',
      textDecoration: 'none',
      fontSize: '7rem',
      fontWeight: 'bold',
      [theme.breakpoints.down('xs')]: {
        fontSize: '3rem'
      }
    },
    icon: {
      flexGrow: 1,
      fontSize: '8rem',
      color: '#FBAB7E',
      [theme.breakpoints.down('xs')]: {
        fontSize: '4rem'
      }
    },
    logoWrap: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
      <Typography className={classes.logoWrap} variant="h2" component="h2">
        <TheatersIcon className={classes.icon} />
        <Link to="/browse" className={classes.logo}>
          MOOVIX
        </Link>
      </Typography>
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
