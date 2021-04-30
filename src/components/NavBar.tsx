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

    favorite: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '2rem',
      marginTop: '.4rem',
      color: '#FBAB7E',
      fontSize: '2rem',
      textDecoration: 'none',
      '&:hover': {
        color: '#fff'
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '1rem'
      }
    },
    navLinks: {
      display: 'flex',
      flexGrow: 1
    },
    icon: {
      fontSize: '2.5rem'
    }
  })
);

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div className={classes.navLinks}>
          {isAuthenticated ? (
            <>
              <Typography variant="h4" component="h3">
                <Link to="/favorite" className={classes.favorite}>
                  <StarIcon className={classes.icon} />
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
