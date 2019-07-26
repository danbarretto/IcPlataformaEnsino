import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default class QuestaoAberta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resposta:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            resposta:event.target.value
        })
    }

    handleSubmit(){
        let data = {
            idUser: localStorage.getItem('id'),
            id: this.props.id,
            points: this.props.pontuacao,
            status: 'Pendente',
            resposta:this.state.resposta
        }
        fetch('/api/updateScore', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok){
                alert("Submissão enviada com sucesso!")
                window.location.reload()
            }else if(res.status===403){
                alert("Você já realizou 1 submissão desta atividade")
            }
         })
    }

    render() {
        return (
            <Form>
                <p>{this.props.data.enunciado}</p>
                <Form.Label>Digite sua Resposta</Form.Label>
                <Form.Control onChange={this.handleChange} name='resposta' as='textarea'></Form.Control>
                <Button onClick={this.handleSubmit.bind(this)} style={{margin:'10px'}}>Enviar</Button>
            </Form>
        )
    }
}