import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundImage:
      'linear-gradient(to right, #fd746c 0%, #ff9068  51%, #fd746c  100%)',
    margin: '10px',
    padding: '15px 45px',
    textAlign: 'center',
    textTransform: 'uppercase',
    transition: '0.5s',
    backgroundSize: '200% auto',
    color: 'white',
    boxShadow: '0 0 20px #eee',
    borderRadius: '10px',
    display: 'block',
    '&:hover': {
      backgroundPosition:
        'right center' /* change the direction of the change here */,
      color: '#fff',
      textDecoration: 'none'
    }
  }
});

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      type="button"
      className={classes.root}
      style={{ background: '#F29E18', color: '#fff', fontWeight: 'bold' }}
      onClick={() =>
        loginWithRedirect({
          redirectUri: 'http://localhost:3000/browse'
        })
      }
    >
      LogIn
    </Button>
  );
};

export default LoginButton;
