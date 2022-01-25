import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Collapse, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarText, NavbarToggler, UncontrolledDropdown, } from 'reactstrap';
import logo from '../../../assets/logo/logo-solo.png';


function HeaderNav(props: any) {
    let navigate = useNavigate();
    const handleLogout = () => {
        alert('Cerraste Sesión...')
        setToggle(!toggle)
        navigate('/')
    }
    const [toggle, setToggle] = useState(false)
    const mediaQuery = window.matchMedia('(max-width: 991px)')
    const handleToggle = () => {
        if (mediaQuery.matches) {
            setToggle(!toggle)
        }
    }

    return (
        <Navbar
            className='navbar-custom'
            expand="lg"
            fixed='top'
        >
            <Link to="/"><img src={logo} className="navbar-logo" alt="logo-navbar" /></Link>
            <NavbarToggler onClick={handleToggle} className='navbar-dark' />
            <Collapse
                navbar
                isOpen={toggle}
            >
                <Nav
                    className="me-auto"
                    navbar
                >
                    <UncontrolledDropdown
                        inNavbar
                        nav
                    >
                        <DropdownToggle
                            caret
                            nav
                        >
                            Datos
                        </DropdownToggle>
                        <DropdownMenu right>
                            <Link className="dropdown-item" to="/janijim" onClick={handleToggle}>Janijim</Link>
                            <Link className="dropdown-item" to="/groups" onClick={handleToggle}>Grupos</Link>
                            <Link className="dropdown-item" to="/areas" onClick={handleToggle}>Shijvot</Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown
                        inNavbar
                        nav
                    >
                        <DropdownToggle
                            caret
                            nav
                        >
                            Actividades
                        </DropdownToggle>
                        <DropdownMenu right>
                            <Link className="dropdown-item" to="" onClick={handleToggle}>Actividades</Link>
                            <Link className="dropdown-item" to="" onClick={handleToggle}>Asistencia</Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown
                        inNavbar
                        nav
                    >
                        <DropdownToggle
                            caret
                            nav
                        >
                            Pagos
                        </DropdownToggle>
                        <DropdownMenu right>
                            <Link className="dropdown-item" to="" onClick={handleToggle}>Precios</Link>
                            <Link className="dropdown-item" to="" onClick={handleToggle}>Precios Especiales</Link>
                            <Link className="dropdown-item" to="" onClick={handleToggle}>Pagos</Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>
                    <Link className="dropdown-item" to="" onClick={handleLogout}>Cerrar Sesión</Link>
                </NavbarText>
            </Collapse>
        </Navbar>
        /*<nav className="navbar navbar-expand-lg navbar-custom fixed-top">
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
        </nav >*/
    )
}
export default HeaderNav