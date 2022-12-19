import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Cookie from 'js-cookie'

// Components
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

// Redux 
import { logout } from '../../redux/users/userActions';

// Assets
import Logo from '../../logo.svg'

function NavBar({ }) {
    const userInfo = Cookie.get('userInfo') || null;
    let userJson = {}
    if (userInfo) {
        userJson = JSON.parse(userInfo)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <Navbar bg='secondary'>
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Nav className="justify-content-center w-100">
                        <Nav.Item>
                            <Nav.Link href="/home">Inicio</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/store">Tienda</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={userInfo ? `Hola, ${userJson.first_name} ${userJson.last_name}` : 'Cuenta'}
                                menuVariant="light"
                            >
                                {
                                    userInfo ? (
                                        <>
                                            <NavDropdown.Item href="#action/3.1">
                                                Tu cuenta
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2" onClick={() => handleLogout()}>
                                                Cerrar sesión
                                            </NavDropdown.Item>
                                        </>
                                    ) : (
                                        <>
                                            <NavDropdown.Item href="/?mode=login">
                                                Iniciar sesión
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/?mode=register">
                                                Registrarse
                                            </NavDropdown.Item></>
                                    )
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

NavBar.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)