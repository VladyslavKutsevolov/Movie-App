import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

let redirectURI: string;

if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_AUTH0_REDIRECT_URI) {
    redirectURI = process.env.REACT_APP_AUTH0_REDIRECT_URI;
  }
} else {
  redirectURI = 'http://localhost:3000/browse';
}

const Auth0ProviderWithHistory = ({ children }: { children: ReactNode }) => {
  const domain: string | undefined = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId: string | undefined = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState: any) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain || ''}
      clientId={clientId || ''}
      redirectUri={redirectURI}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
