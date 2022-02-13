import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/App.css';
import { Outlet } from "react-router-dom";
import HeaderNav from './components/UI/Layout/HeaderNav';
import NotLoggedIn from './pages/NotLoggedIn';

function App() {
  let { isAuthenticated } = useAuth0()
  isAuthenticated = true // --> Only for testing...

  return (
    <>
      <header>
        <HeaderNav />
      </header>
      {
        isAuthenticated ? <Outlet /> : <NotLoggedIn />
      }
    </>
  );
}

export default App;