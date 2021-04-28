import React from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Button,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#6D5959'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    flexGrow: 1,
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.7rem'
  },
  favorite: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2rem',
    marginTop: '.4rem',
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      color: '#F29E18'
    }
  },
  navLinks: {
    display: 'flex',
    flexGrow: 1
  }
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <TheatersIcon />
        <div className={classes.navLinks}>
          <Typography variant="h5">
            <Link to="/" className={classes.logo}>
              MOOVIX
            </Link>
          </Typography>

          <Typography variant="h5">
            <Link to="/favorite" className={classes.favorite}>
              <StarIcon />
              Favorite Movies
            </Link>
          </Typography>
        </div>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
