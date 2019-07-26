import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import QuestaoAberta from './QuestaoAberta';


export default class QuestaoAbertaEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visualization: false,
            enunciado: '',
            resposta:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleFinish(){
        if(this.state.enunciado!=='' && this.state.resposta!==''){
            let data = {
                enunciado:this.state.enunciado,
                resposta:this.state.resposta
            }
            this.props.onJsonFinished(JSON.stringify(data))
        }else{
            alert("Preencha todos os campos!")
        }
    }

    render() {
        const form = <Form>
            <Form.Label>Enunciado da Questão</Form.Label>
            <Form.Control defaultValue={this.state.enunciado} name='enunciado' onChange={this.handleChange} as='textarea'></Form.Control>
            
            <Form.Label>Sua Resposta (esta questão não será auto corrigida)</Form.Label>
            <Form.Control defaultValue={this.state.resposta} name='resposta' onChange={this.handleChange} as='textarea'></Form.Control>

        </Form>
        
        let visual = <QuestaoAberta
            data={{ 
                enunciado: this.state.enunciado,
                
            }}
        ></QuestaoAberta>
        return (
            <div>
                {!this.state.visualization && form}
                {this.state.visualization && visual}
                <Button
                    style={{margin:'10px'}}
                    onClick={() => this.setState({ visualization: !this.state.visualization })}
                >{this.state.visualization ? 'Editar' : 'Visualizar'}</Button>
                <Button onClick={this.handleFinish.bind(this)} variant='success'>Finalizar</Button>
            </div>
        )
    }
}