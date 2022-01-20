import React from 'react';
import './styles/App.css';
import { Outlet } from "react-router-dom";
import HeaderNav from './components/UI/Layout/HeaderNav';

function App() {
  return (
    <>
      <header>
        <HeaderNav />
      </header>
      <Outlet />
    </>
  );
}

export default App;