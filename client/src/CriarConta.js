import React from "react";
import NavBar from "./components/NavBar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import Footer from "./components/Footer"
var sha512 = require('js-sha512').sha512
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
      senha: "",
      cpf: "",
      dataNasc:'',
      validCpf: false,
      accountOk: false
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
        senha: sha512(this.state.senha),
        cpf: this.state.cpf
      };
      if (data !== undefined) {
        fetch("/api/insereConta", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => {
          this.setState({ accountOk: res.ok });
          if (res.status === 403) {
            alert("Email ou CPF já Cadastrados!")
          } else if (res.ok) {
            if (alert("Conta criada com sucesso!")) {
            } else {
              //redirecionar para profile
              window.location.reload();
            }
          }
        });
      }
    } catch (error) {
      console.log(`Erro! : ${error}`);
    }
  }

  handleSubmit(event) {
    //const nomeInserted = this.state.nome;
    const form = event.currentTarget;
    let alertObj;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.adicionarConta();
    }
    this.setState({
      validated: true
    });
    return alertObj;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF === "00000000000" || strCPF=== '11111111111') return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  render() {
    const { validated } = this.state;

    return (
      <div>
        <NavBar />
        <div>
          <Form noValidate validated={validated}>
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationCustom01">
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
                md="3"
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
                md="3"
                controlId="cpf"
                onChange={this.handleChange}
              >
                <Form.Label>CPF</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="cpf"
                    isValid={this.testaCPF(this.state.cpf)}
                    placeholder="CPF"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite um cpf válido.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
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
        <Footer></Footer>
      </div>
    );
  }
}

export default CriarConta;
