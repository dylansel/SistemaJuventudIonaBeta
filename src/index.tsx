import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import MainRoutes from './routes/mainRoutes';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-jve24r55.us.auth0.com"
      clientId="QK1l4qzYhR7z6fGHCvo7HcyiTQmGg8K2"
      redirectUri={window.location.origin}
    >
      <MainRoutes />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
