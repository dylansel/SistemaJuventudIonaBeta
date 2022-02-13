import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Collapse, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarText, NavbarToggler, UncontrolledDropdown, } from 'reactstrap';
import logo from '../../../assets/logo/logo-solo.png';

function HeaderNav(props: any) {
    const handleLogout = () => {
        alert('Cerraste Sesión...')
        setToggle(!toggle)
        localStorage.clear();
        window.location.href = '/login';
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
                            <Link className="dropdown-item" to="/families" onClick={handleToggle}>Familias</Link>
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
    )
}
export default HeaderNav