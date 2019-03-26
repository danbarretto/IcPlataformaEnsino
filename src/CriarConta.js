import React from 'react'
import NavBar from './components/NavBar'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CriarConta extends React.Component{


    render(){
        return(
            <div>
                <NavBar></NavBar>
                <div>
                    <Row>
                        <Col></Col>
                        <Col>Digite seus Dados</Col>
                        <Col></Col>
                    </Row>

                    <Row>

                    <Col></Col>
                    <Col>
                            <Form>
                                <Form.Group controlId="criarConta.ControlInput1">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Nome" />

                                </Form.Group>
                            </Form>
                    </Col>
                    <Col></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default CriarConta