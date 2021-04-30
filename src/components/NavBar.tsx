import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';
import StarIcon from '@material-ui/icons/Star';
import AuthNav from './auth/AuthNav';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '1rem'
      }
    },
    navLinks: {
      display: 'flex',
      flexGrow: 1
    }
  })
);

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <TheatersIcon />
        <div className={classes.navLinks}>
          <Typography variant="h5">
            <Link to="/browse" className={classes.logo}>
              MOOVIX
            </Link>
          </Typography>
          {isAuthenticated ? (
            <>
              <Typography variant="h5">
                <Link to="/favorite" className={classes.favorite}>
                  <StarIcon />
                  Favorite
                </Link>
              </Typography>{' '}
            </>
          ) : null}
        </div>
        <AuthNav />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
