import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Juventud Ioná
        </p>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem"
          }}
        >
          <Link to="/janijim">Janijim</Link> |{" "}
          <Link to="/familias">Familias</Link>
        </nav>
        <Outlet />

      </header>
    </div>
  );
}

export default App;
