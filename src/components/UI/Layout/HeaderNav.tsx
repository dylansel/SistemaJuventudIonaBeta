import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo/logo-solo.png';

function HeaderNav(props: any) {
    let navigate = useNavigate();
    const handleLogout = () => {
        alert('Cerraste Sesión...')
        navigate('/')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
            <Link to="/"><img src={logo} className="navbar-logo" alt="logo-navbar" /></Link>
            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-md-5 justify-content-start">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Datos
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/janijim">Janijim</Link>
                            <Link className="dropdown-item" to="/groups">Grupos</Link>
                            <Link className="dropdown-item" to="/areas">Shijvot</Link>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Actividades
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="">Actividades</Link>
                            <Link className="dropdown-item" to="">Asistencia</Link>

                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Pagos
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="">Precios</Link>
                            <Link className="dropdown-item" to="">Precios Especiales</Link>
                            <Link className="dropdown-item" to="">Pagos</Link>
                        </ul>
                    </li>
                </div>
                <div className="mx-5">
                    <button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
        </nav >
    )
}
export default HeaderNav