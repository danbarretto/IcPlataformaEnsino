import React from "react";
import NavBar from "./components/NavBar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

class CriarConta extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      response: "",
      validated: false,
      nome: "",
      sobrenome: "",
      email: "",
      cidade: "",
      estado: "",
      cep: "",
      data: "",
      senha: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async adicionarConta() {
    try {
      var data = {
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        email: this.state.email,
        cidade: this.state.cidade,
        estado: this.state.estado,
        cep: this.state.cep,
        data: this.state.data,
        senha: this.state.senha
      };
      fetch("http://localhost:5000/api/insereConta", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          res.json();
        })
        .then(data => console.log(data));
    } catch (error) {
      console.log(`Erro! : ${error}`);
    }
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.adicionarConta();
    }
    this.setState({
      validated: true,
      nome: event.currentTarget.nome
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: res.express });
      })
      .catch(err => {
        console.log(err);
      });
  }

  callApi = async () => {
    const response = await fetch("/api/mensagem");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body.recordset);
    return body;
  };

  render() {
    const { validated } = this.state;

    return (
      <div>
        <NavBar />
        <div>
          <Form noValidate validated={validated}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationCustom02"
                onChange={this.handleChange}
              >
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="sobrenome"
                  placeholder="Sobrenome"
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationCustomUsername"
                onChange={this.handleChange}
              >
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text type="email" id="inputGroupPrepend">
                      @
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    name="email"
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
              <Form.Group
                as={Col}
                md="6"
                controlId="validationCustom03"
                onChange={this.handleChange}
              >
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cidade"
                  name="cidade"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Cidade inválida.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                controlId="validationCustom04"
                onChange={this.handleChange}
              >
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Estado"
                  name="estado"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Estado inválido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                controlId="validationCustom05"
                onChange={this.handleChange}
              >
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CEP inválido.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                md="3"
                controlId="validCustom08"
                onChange={this.handleChange}
              >
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control type="date" name="data" required />
                <Form.Control.Feedback type="invalid">
                  Data inválida.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                controlId="validCustom06"
                onChange={this.handleChange}
              >
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  value={this.state.pass1}
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Senha inválida.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="3"
                controlId="validCustom07"
                onChange={this.handleChange}
              >
                <Form.Label>Confirme a Senha</Form.Label>
                <Form.Control
                  value={this.state.pass2}
                  type="password"
                  placeholder="Senha"
                  required
                />
                <Form.Control.Feedback type="invalid" />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                required
                label="Concordo com os termos de condição"
                feedback="Você deve concordar com os termos para continuar."
              />
            </Form.Group>
            <Button onClick={e => this.handleSubmit(e)}>Criar Conta</Button>
          </Form>
          <br />
        </div>
      </div>
    );
  }
}

export default CriarConta;
