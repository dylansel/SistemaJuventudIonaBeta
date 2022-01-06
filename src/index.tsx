import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Janijim from './routes/janijim';
import Familias from './routes/familias';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="janijim" element={<Janijim />} />
          <Route path="familias" element={<Familias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
