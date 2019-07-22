import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
var sha512 = require('js-sha512').sha512

export default class Perfil extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: true,
            altered: false,
            nome: localStorage.getItem('nome'),
            sobrenome: localStorage.getItem('sobrenome'),
            data: localStorage.getItem('dataNasc'),
            cep: localStorage.getItem('cep'),
            cidade: localStorage.getItem('cidade'),
            estado: localStorage.getItem('estado'),
            senha: 'default',
            confirmar: ''
        }
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            altered: true
        })
    }

    handleUpdateInfo() {
        this.setState({
            disabled: true
        })
        if (this.state.altered) {

            let data = {
                id: localStorage.getItem('id'),
                nome: this.state.nome,
                sobrenome: this.state.sobrenome,
                data: this.state.data,
                cep: this.state.cep,
                cidade: this.state.cidade,
                estado: this.state.estado,
                senha: 'default'
            }
            console.log(data)
            if (this.state.senha !== 'default' && this.state.senha === this.state.confirmar) {
                data.senha = sha512(this.state.senha)
                console.log(data.senha)
            } else if (this.state.senha !== 'default' && this.state.senha !== this.state.confirmar) {
                alert("Senhas diferem!")
                return;
            }
            fetch("/api/updateInfo", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    alert("Dados alterados com sucesso!")
                    localStorage.setItem('nome', this.state.nome)
                    localStorage.setItem('sobrenome', this.state.sobrenome)
                    localStorage.setItem('dataNasc', this.state.data)
                    localStorage.setItem('cep', this.state.cep)
                    localStorage.setItem('cidade', this.state.cidade)
                    localStorage.setItem('estado', this.state.estado)
                    window.location.reload()
                }
            }).catch(err => {
                console.log(err)
            })

        }
    }

    render() {
        return (<div>
            <NavBar />
            <Jumbotron >
                <h1>Perfil</h1>
                <Form style={{ backgroundColor: "#F8F8F8", borderRadius: '5px', padding: '10px' }}>
                    <Form.Row>

                        <Form.Group as={Col} md='3'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type='text' name='nome' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("nome")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control type='text' name='sobrenome' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("sobrenome")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' name='email' disabled={true} defaultValue={localStorage.getItem("email")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type='text' name='cpf' disabled={true} defaultValue={localStorage.getItem("cpf")}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} md='3'>
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type='text' name='data' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("dataNasc")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>CEP</Form.Label>
                            <Form.Control type='text' name='cep' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("cep")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control type='text' name='cidade' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("cidade")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Estado</Form.Label>
                            <Form.Control type='text' name='estado' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("estado")}></Form.Control>
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Nova Senha</Form.Label>
                            <Form.Control type='password' name='senha' onChange={this.handleFormChange} disabled={this.state.disabled} ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control type='password' name='confirmar' onChange={this.handleFormChange} disabled={this.state.disabled} ></Form.Control>
                        </Form.Group>

                    </Form.Row>
                    <div>

                        {this.state.disabled && <Button onClick={() => this.setState({ disabled: false })}>Editar Perfil</Button>}
                        {!this.state.disabled && <Button onClick={this.handleUpdateInfo.bind(this)} variant='success'>Salvar Alterações</Button>}
                    </div>

                </Form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Jumbotron>
            <Footer position='absolute'></Footer>
        </div>)
    }
}