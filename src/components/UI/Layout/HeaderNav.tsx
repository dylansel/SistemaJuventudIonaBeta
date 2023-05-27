import { useAuth0, User } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Collapse, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarText, NavbarToggler, UncontrolledDropdown, } from 'reactstrap';
import logo from '../../../assets/logo/logo-solo.png';
import DialogBox from '../Modals/DialogBox';

function HeaderNav() {
    const { logout } = useAuth0()
    const { isAuthenticated, user } = useAuth0<User>()

    const [showPrompt, setShowPrompt] = useState(false)

    const [isRedirecting, setIsRedirecting] = useState(false)

    const handleLogout = () => {
        setShowPrompt(false)
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
                <Link to="/" onClick={() => setToggle(false)}><img src={logo} className="navbar-logo" alt="logo-navbar" /></Link>
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
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/janijim" onClick={handleToggle}>Janijim</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/families" onClick={handleToggle}>Familias</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/groups" onClick={handleToggle}>Grupos</NavLink>
                                {/* <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/areas" onClick={handleToggle}>Shijvot</NavLink> */}
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
                                {/* <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/activities" onClick={handleToggle}>Actividades</NavLink> */}
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/attendance" onClick={handleToggle}>Asistencia</NavLink>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <UncontrolledDropdown
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
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/payments" onClick={handleToggle}>Pagos</NavLink>
                                
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/pricingCases" onClick={handleToggle}>Casos de precios</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/prices" onClick={handleToggle}>Precios</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/specialPrices" onClick={handleToggle}>Precios Especiales</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="/grants" onClick={handleToggle}>Becas</NavLink> 
                                

                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                        {/* <UncontrolledDropdown
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
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="reports/1" onClick={handleToggle}>Reporte 01</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="reports/2" onClick={handleToggle}>Reporte 02</NavLink>
                                <NavLink className={(navData) => `dropdown-item ${(navData.isActive ? 'active' : '')}`} to="reports/3" onClick={handleToggle}>Reporte 03</NavLink>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    <NavbarText >
                        {isAuthenticated &&
                            <div className="user d-flex text-white mt-3 mt-md-0">
                                <div>
                                    <img alt="Profile" src={user?.picture} referrerPolicy="no-referrer" />
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center text-center'>
                                    <p>{user?.name?.split(' ')[0]}</p>
                                    <Link className="dropdown-item user" to="#" onClick={() => setShowPrompt(!showPrompt)}>{isRedirecting ? "Cerrando Sesión..." : "Cerrar Sesión"}</Link>
                                </div>
                            </div>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
            <DialogBox
                title='Cerrar Sesión'
                text={`${user?.name?.split(' ')[0]}, ¿estás seguro que deseas cerrar sesión?`}
                showDialog={showPrompt}
                confirmNavigation={handleLogout}
                cancelNavigation={() => setShowPrompt(false)}
            />
        </header>
    )
}
export default HeaderNav