import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from './LogOutButton';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : null;
};

export default AuthenticationButton;
