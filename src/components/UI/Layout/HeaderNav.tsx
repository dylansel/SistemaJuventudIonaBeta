import { useAuth0, User } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Collapse, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarText, NavbarToggler, UncontrolledDropdown, } from 'reactstrap';
import logo from '../../../assets/logo/logo-solo.png';

function HeaderNav(props: any) {
    const { logout } = useAuth0()
    const { isAuthenticated, user } = useAuth0<User>()

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
                                <Link className="dropdown-item" to="/activities" onClick={handleToggle}>Actividades</Link>
                                <Link className="dropdown-item" to="/attendance" onClick={handleToggle}>Asistencia</Link>
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
                                <Link className="dropdown-item" to="/payments" onClick={handleToggle}>Pagos</Link>
                                <Link className="dropdown-item" to="/pricingCases" onClick={handleToggle}>Casos de precios</Link>
                                <Link className="dropdown-item" to="/prices" onClick={handleToggle}>Precios</Link>
                                <Link className="dropdown-item" to="/grants" onClick={handleToggle}>Becas</Link>
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
                                Reportes
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to="#" onClick={handleToggle}>Reporte 01</Link>
                                <Link className="dropdown-item" to="#" onClick={handleToggle}>Reporte 02</Link>
                                <Link className="dropdown-item" to="#" onClick={handleToggle}>Reporte 03</Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText >
                        {isAuthenticated &&
                            <div className="user d-flex text-white mt-3 mt-md-0">
                                <div>
                                    <img alt="Profile" src={user?.picture} referrerPolicy="no-referrer" />
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center text-center'>
                                    <p>{user?.name?.split(' ')[0]}</p>
                                    <Link className="dropdown-item user" to="" onClick={handleLogout}>{isRedirecting ? "Cerrando Sesión..." : "Cerrar Sesión"}</Link>
                                </div>
                            </div>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </header>
    )
}
export default HeaderNav