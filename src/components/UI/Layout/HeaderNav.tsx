import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Collapse, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarText, NavbarToggler, UncontrolledDropdown, } from 'reactstrap';
import logo from '../../../assets/logo/logo-solo.png';

function HeaderNav(props: any) {
    const { logout } = useAuth0()
    let { isAuthenticated } = useAuth0()

    const [isRedirecting, setIsRedirecting] = useState(false)

    const handleLogout = () => {
        setIsRedirecting(true)
        logout({ returnTo: window.location.origin })
    }

    const [toggle, setToggle] = useState(false)
    const mediaQuery = window.matchMedia('(max-width: 991px)')
    const handleToggle = () => {
        if (mediaQuery.matches) {
            setToggle(!toggle)
        }
    }

    return (
        <header>
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
                        {isAuthenticated &&
                            <Link className="dropdown-item" to="" onClick={handleLogout}>{isRedirecting ? "Cerrando Sesión..." : "Cerrar Sesión"}</Link>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </header>
    )
}
export default HeaderNav