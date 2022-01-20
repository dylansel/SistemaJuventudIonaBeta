import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import MainRoutes from './routes/mainRoutes';

ReactDOM.render(
  <React.StrictMode>
    <MainRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
