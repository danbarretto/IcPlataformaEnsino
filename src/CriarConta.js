import React from "react";
import NavBar from "./components/NavBar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

class CriarConta extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false,
    };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    let pass1, pass2;
    return (
      <div>
        <NavBar />
        <div>
          <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nome</Form.Label>
                <Form.Control required type="text" placeholder="Nome" />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control required type="text" placeholder="Sobrenome" />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text type="email" id="inputGroupPrepend">
                      @
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite um email válido.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" placeholder="Cidade" required />
                <Form.Control.Feedback type="invalid">
                  Cidade inválida.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" placeholder="Estado" required />
                <Form.Control.Feedback type="invalid">
                  Estado inválido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>CEP</Form.Label>
                <Form.Control type="text" placeholder="CEP" required />
                <Form.Control.Feedback type="invalid">
                  CEP inválido.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="3" controlId="validCustom06">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control value={this.state.pass1} type="password" placeholder="Senha" required></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Senha inválida.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validCustom06">
                    <Form.Label>Confirme a Senha</Form.Label>
                    <Form.Control value={this.state.pass2} type="password" placeholder="Senha" required></Form.Control>
                    <Form.Control.Feedback type="invalid" value={this.state.res}>
                        
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                required
                label="Concordo com os termos de condição"
                feedback="Você deve concordar com os termos para continuar."
              />
            </Form.Group>
            <Button type="submit">Criar Conta</Button>
          </Form>
          
        </div>
      </div>
    );
  }
}

export default CriarConta;
