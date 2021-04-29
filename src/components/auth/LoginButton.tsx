import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      type="button"
      onClick={() =>
        loginWithRedirect({
          redirectUri: 'http://localhost:3000/browse'
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
