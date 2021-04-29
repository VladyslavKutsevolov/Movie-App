import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="contained"
      type="button"
      style={{ background: '#F29E18', color: '#fff' }}
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
