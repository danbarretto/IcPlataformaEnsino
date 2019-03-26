import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Form from 'react-bootstrap/Form'
function NavBar(){

    const popEntrar = (<Popover id="popover-basic" title="Entrar">
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite seu email" />
                
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Entrar
    </Button>
        </Form>
        <Form/> 
    </Popover>)
    return(
        <div>
        
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Plataforma de Ensino</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                        <Nav.Link href="/aulas">Aulas</Nav.Link>
                        <Nav.Link href="/atividades">Atividades</Nav.Link>
                        <Nav.Link href="/turmas">Turmas</Nav.Link>
                        <Nav.Link href="/eventos">Eventos</Nav.Link>
                        <Nav.Link href="/desafios">Desafios</Nav.Link>
                    </Nav>
                    <ButtonToolbar className="mr-3" aria-label="First group">
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popEntrar}>
                            <Button variant="primary">Entrar</Button>
                            
                        </OverlayTrigger>
                        
                    </ButtonToolbar>
                    <ButtonToolbar  aria-label="Second group">
                        <Button variant="outline-light" href="/criarconta">Criar Conta</Button>
                    </ButtonToolbar>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar