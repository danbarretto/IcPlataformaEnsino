import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
function NavBar(){

   
    return(
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Plataforma de Ensino</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Início</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <Nav.Link>Aulas</Nav.Link>
                        <Nav.Link>Atividades</Nav.Link>
                        <Nav.Link>Turmas</Nav.Link>
                        <Nav.Link>Eventos</Nav.Link>
                        <Nav.Link>Desafios</Nav.Link>
                    </Nav>
                    <ButtonToolbar className="mr-3" aria-label="First group">
                        <Button variant="primary">Entrar</Button>
                        
                    </ButtonToolbar>
                    <ButtonToolbar  aria-label="Second group">
                        <Button variant="outline-light">Criar Conta</Button>
                    </ButtonToolbar>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar