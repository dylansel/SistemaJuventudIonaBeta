import React from 'react';
import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo/logo-solo.png';

function HeaderNav(props: any) {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
            <Link to="/"><img src={logo} className="navbar-logo" alt="logo-navbar" /></Link>
            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-md-5">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Janijim
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/janijim">Janijim</Link>
                            <Link className="dropdown-item" to="/familias">Familias</Link>
                            <Link className="dropdown-item" to="/groups">Grupos</Link>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Actividades
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="">Actividades</Link>
                            <Link className="dropdown-item" to="">Precios</Link>
                            <Link className="dropdown-item" to="">Precios Especiales</Link>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Asistencia
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="">Asistencia</Link>
                            <Link className="dropdown-item" to="">Pagos</Link>
                        </ul>
                    </li>
                </div>
            </div>
        </nav>
    )
}
export default HeaderNav