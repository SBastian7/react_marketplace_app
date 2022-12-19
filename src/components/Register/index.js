import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, Row, Spinner, Col } from 'react-bootstrap';

import { register } from '../../redux/users/userActions';
import Cookie from 'js-cookie'

function Register(props) {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [checkbox, setCheckbox] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');

    const userRegister = useSelector(state => state.registerReducer);
    const { loading, userInfo, error } = userRegister;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userInfoCookie = Cookie.get('userInfo');

    const validateFields = () => {
        if (password === password2) {
            return true;
        } else {
            return false;
        }
    }

    React.useEffect(() => {
        if (userInfoCookie) {
            navigate('/home')
        }
    }, [userInfoCookie])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            setFeedback('');
            dispatch(register(email, firstName, lastName, email, password, password2));
        } else {
            setFeedback('Las contraseñas no coinciden');
        }
    }

    return (
        <Card.Body style={{ height: "60vh"}}>
            {/* <Card.Title>Registrarse</Card.Title> */}
            <Card.Text>
                Ingresa los siguientes datos para registrarte
            </Card.Text>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Control required type="text" placeholder="Nombres" onChange={(e) => setFirstName(e.target.value)} />
                {/* { ! && error.includes('first_name') && <Row><small className='text-danger'>{error['first_name']}</small></Row> } */}
                <br />
                <Form.Control required type="text" placeholder="Apellidos" onChange={(e) => setLastName(e.target.value)} />
                {/* { ! && error.includes('last_name') && <Row><small className='text-danger'>{error['last_name']}</small></Row> } */}
                <br />
                <Form.Control required type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                {/* { ! && error.includes('email') && <Row><small className='text-danger'>{error['email']}</small></Row> } */}
                <br />
                <Form.Control required type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Form.Control required type="password" placeholder="Repetir contraseña" onChange={(e) => setPassword2(e.target.value)} />
                {
                    feedback && <small className='text-danger'>Las contraseñas no coinciden.</small>
                }
                {/* { ! && error.includes('password') && <Row><small className='text-danger'>{error['password']}</small></Row> } */}
                <br />
                <Form.Check required type='checkbox' id='CBTerminos' label='Acepto términos y condiciones' className='mt-3' value={checkbox} onChange={(e) => setCheckbox(e.target.value)} />
                <Row className='justify-content-center'>
                    <Col md={7} className="my-3">
                        <Button variant="primary" type="submit" className='mx-auto w-100' disabled={loading}>
                            { loading ? <Spinner animation="grow" size='sm' /> : "Registrarme" }
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Card.Body>
    )
}

Register.propTypes = {}

export default Register
