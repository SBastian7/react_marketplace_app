import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

import Cookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Form, Row, Spinner, Col } from 'react-bootstrap';
import { login } from '../../redux/users/userActions';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const userReducer = useSelector(state => state.userReducer);
    const { loading, userInfo, error } = userReducer;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userInfoCookie = Cookie.get('userInfo');
    
    React.useEffect(() => {
        if (userInfoCookie) {
            navigate('/home')
        }
    }, [userInfoCookie])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Card.Body style={{ height: "60vh"}}>
            {/* <Card.Title>Registrarse</Card.Title> */}
            <div className="d-flex" style={{ height: "100px" }}></div>
            <Card.Text>
                Ingresa los siguientes datos para iniciar sesión
            </Card.Text>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Control required type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                {/* { ! && error.includes('email') && <Row><small className='text-danger'>{error['email']}</small></Row> } */}
                <br />
                <Form.Control required type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Row className='justify-content-center'>
                    <Col md={7} >
                        <Button variant="primary" type="submit" className='my-3 mx-auto w-100' disabled={loading}>
                            { loading ? <Spinner animation="grow" size='sm' /> : "Iniciar sesión" }
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Card.Body>
    )
}

Login.propTypes = {}

export default Login
