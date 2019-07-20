import React from 'react'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class Perfil extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: true,
            nome:'',
            sobrenome:'',
            cpf:''
        }
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleUpdateInfo() {
        this.setState({
            disabled: true
        })
    }

    render() {
        return (<div>
            <NavBar />
            <Jumbotron>
                <h1>Perfil</h1>
                <Form style={{ backgroundColor: "#F8F8F8", borderRadius: '5px', padding: '10px' }}>
                    <Form.Row>

                        <Form.Group as={Col} md='4'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type='text' name='nome' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("nome")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='4'>
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control type='text' name='sobrenome' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("sobrenome")}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md='4'>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type='text' disabled='true' defaultValue={localStorage.getItem("cpf")}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md='4'>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type='text' disabled='true' defaultValue={localStorage.getItem("cpf")}></Form.Control>
                        </Form.Group>
                        
                        <Form.Group as={Col} md='4'>
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type='text' name='data' onChange={this.handleFormChange} disabled={this.state.disabled} defaultValue={localStorage.getItem("dataNasc")}></Form.Control>
                        </Form.Group>

                    </Form.Row>
                    <div style={{ paddingLeft: '15px' }}>

                        {this.state.disabled && <Button onClick={() => this.setState({ disabled: false })}>Editar Perfil</Button>}
                        {!this.state.disabled && <Button onClick={this.handleUpdateInfo.bind(this)} variant='success'>Salvar Alterações</Button>}
                    </div>

                </Form>
            </Jumbotron>
            <Footer></Footer>
        </div>)
    }
}