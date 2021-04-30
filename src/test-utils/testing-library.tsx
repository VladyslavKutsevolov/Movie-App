import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render } from '@testing-library/react';
import Auth0ProviderWithHistory from '../components/auth/AuthProviderWithHistory';

interface Prop {
  children: ReactNode;
}

const withRouterAndAuth = ({ children }: Prop) => {
  return (
    <Router>
      <Auth0ProviderWithHistory>{children}</Auth0ProviderWithHistory>
    </Router>
  );
};

const renderWithReduxStore = (ui: JSX.Element, options?: any) => {
  return render(ui, { wrapper: withRouterAndAuth, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithReduxStore as render };
