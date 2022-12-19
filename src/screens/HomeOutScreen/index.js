import React from 'react'
import PropTypes from 'prop-types'
import {useLocation} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import { Card, Button, Tabs, Tab, Row, Col } from 'react-bootstrap'

import Register from '../../components/Register';
import Login from '../../components/Login';

function HomeOutScreen(props) {
  const search = useLocation().search;
  const mode = new URLSearchParams(search).get('mode');
  const validMode = ['login', 'register'].includes(mode);

  return (
    <Container fluid="md" className='d-flex' style={{ height: "80vh" }}>
      <Row className='align-items-center justify-content-center h-100 w-100 mx-auto mt-5'>
        <Col xs={12} md={8} lg={5} className="px-0">
          <Card className='mx-auto w-100' border='light'>
            <Tabs defaultActiveKey={validMode ? mode : 'login'} className="" fill>
              <Tab eventKey="register" title="Registrarse">
                <Register />
              </Tab>
              <Tab eventKey="login" title="Iniciar sesión">
                <Login />
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

HomeOutScreen.propTypes = {}

export default HomeOutScreen
