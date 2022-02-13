import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import MainRoutes from './routes/mainRoutes';
import { Auth0Provider } from '@auth0/auth0-react';

const envConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN!,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={envConfig.domain}
      clientId={envConfig.clientId}
      redirectUri={window.location.origin}
    >
      <MainRoutes />
    </Auth0Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

reportWebVitals();
