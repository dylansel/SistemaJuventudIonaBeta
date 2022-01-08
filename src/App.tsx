import React from 'react';
import './styles/App.css';
import { Link, Outlet } from "react-router-dom";
import HeaderNav from './components/HeaderNav';

function App() {
  return (
    <>
      <header>
        <HeaderNav/>
      </header>
      
      <Outlet />
    </>

  );
}

export default App;
