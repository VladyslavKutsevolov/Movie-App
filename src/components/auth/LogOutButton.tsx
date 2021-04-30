import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '10px',
      padding: '15px 45px',
      textAlign: 'center',
      textTransform: 'uppercase',
      transition: '0.5s',
      backgroundSize: '200% auto',
      color: 'white',
      borderRadius: '10px',
      display: 'block',
      backgroundImage:
        'linear-gradient(to right, #1e130c 0%, #9a8478  51%, #1e130c  100%)',
      '&:hover': {
        backgroundPosition: 'right center',
        color: '#fff',
        textDecoration: 'none'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '8px 25px'
      }
    }
  })
);

const LogoutButton = () => {
  const { logout } = useAuth0();
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      type="button"
      className={classes.root}
      onClick={() =>
        logout({
          returnTo: window.location.origin
        })
      }
    >
      LogOut
    </Button>
  );
};

export default LogoutButton;
