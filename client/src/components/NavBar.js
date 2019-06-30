import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import { Redirect } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: "",
      senha: "",
      loggedIn: false,
      loginResult: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSair = this.handleSair.bind(this);
  }

  login() {

    fetch(`http://localhost:5000/api/login?email=${this.state.email}&senha=${this.state.senha}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(res => {
      res.json().then(result => {
        if (result !== null) {

          this.setState({ loggedIn: true })
          localStorage.clear()
          localStorage.setItem("logged", this.state.loggedIn)
          localStorage.setItem("nome", result.nome)
          localStorage.setItem("sobrenome", result.sobrenome)
          localStorage.setItem("id", result.id)
          localStorage.setItem("permissao", result.permissao)
          localStorage.setItem("cidade", result.cidade)
          localStorage.setItem("cep", result.cep)
          localStorage.setItem("email", result.email)
          localStorage.setItem("cpf", result.cpf)
          localStorage.setItem("estado", result.estado)
          window.location.reload()
          return <Redirect to='/aulas'></Redirect>;
        }

      })

    }).catch(err => (console.log(err)));
  }

  handleSair() {
    localStorage.clear()
    window.location.replace("/")
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  
  render() {

    const popEntrar = (
      <Popover id="popover-basic" title="Entrar">
        <Form action="/" method="post">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="senha"
              placeholder="Senha"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.login.bind(this)}>
            Entrar
          </Button>
        </Form>
        <Form />
      </Popover>
    );
    let permissao = 0

    let buttonToolbar, navBarLinks;
    if (localStorage.getItem("logged")) {
      const style = {
        color: 'white',
        margin: '5px'
      }
      buttonToolbar = (<div>
        <Form.Label style={style}>Ola {localStorage.getItem("nome")}</Form.Label>
        <Button variant="outline-light" onClick={this.handleSair} >Sair</Button>
      </div>);

      permissao = localStorage.getItem("permissao")
      console.log(permissao)
    }else{
      buttonToolbar = (
        <Form.Row>

          <ButtonToolbar className="mr-3" aria-label="First group">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popEntrar}
            >
              <Button variant="primary">Entrar</Button>
            </OverlayTrigger>
          </ButtonToolbar>
          <ButtonToolbar aria-label="Second group">
            <Button variant="outline-light" href="/criarconta">
              Criar Conta
              </Button>
          </ButtonToolbar>

        </Form.Row>
      );
    }

      //Login as student
      if (permissao === "1") {

        navBarLinks = (

          <Nav className="mr-auto">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/aulas">Aulas</Nav.Link>
            <Nav.Link href="/atividades">Atividades</Nav.Link>
            <Nav.Link href="/eventos">Eventos</Nav.Link>
            <Nav.Link href="/desafios">Desafios</Nav.Link>
          </Nav>

        );
      } else if (permissao === "2") { //login as teacher
        navBarLinks = (
        <Nav className="mr-auto">
          <Nav.Link href="/">Início</Nav.Link>
          <Nav.Link href="/aulas">Aulas</Nav.Link>
          <Nav.Link href="/atividades">Atividades</Nav.Link>
          <Nav.Link href="/turmas">Turmas</Nav.Link>
        </Nav>)
      }else{ //Not Logged
        navBarLinks = (
          <Nav className="mr-auto">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/aulas">Sobre</Nav.Link>
            
          </Nav>)
      }

    



    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Plataforma de Ensino</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {navBarLinks}
            {buttonToolbar}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
