import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { BrowserRouter, Outlet } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
      <Outlet/>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
