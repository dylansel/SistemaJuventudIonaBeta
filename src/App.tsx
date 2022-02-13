import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/App.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/UI/Layout/HeaderNav';
import NotLoggedIn from './pages/NotLoggedIn';

function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      <Navbar />
      {
        isAuthenticated ? <Outlet /> : <NotLoggedIn />
      }
    </>
  );
}

export default App;