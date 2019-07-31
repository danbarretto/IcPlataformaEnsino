import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AtividadeTable from './AtividadeTable';

export default class BuscaAtividade extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            materia: '',
            tipo: '',
            assunto: '',
            titulo: '',
            table: null
        }
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    buscarAtividade() {
        if (this.state.assunto !== '') {
            this.setState({
                table: <AtividadeTable
                    option='2'
                    titulo={this.state.titulo}
                    materia={this.state.materia}
                    assunto={this.state.assunto}
                    tipo={this.state.tipo}
                />
            })
        }
    }

    render() {
        let form = <div>
            <Form>

                <Form.Group>
                    <Form.Label>Título</Form.Label>
                    <Form.Control name='titulo' onChange={this.handleFormChange} type='text'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Matéria</Form.Label>
                    <Form.Control name='materia' defaultValue='Selecione uma Matéria' onChange={this.handleFormChange} as='select'>
                        <option disabled="disabled">Selecione uma Matéria</option>
                        <option>Português</option>
                        <option>Matemática</option>
                        <option>História</option>
                        <option>Geografia</option>
                        <option>Sociologia</option>
                        <option>Filosofia</option>
                        <option>Biologia</option>
                        <option>Física</option>
                        <option>Química</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de Aula</Form.Label>
                    <Form.Control name='tipo' onChange={this.handleFormChange} as='select'>
                        <option selected='selected' disabled='disabled'>Selecione um tipo de aula</option>
                        <option>Múltipla Escolha</option>
                        <option>Completar Lacunas</option>
                        <option>Questão Aberta</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Assunto (obrigatório)</Form.Label>
                    <Form.Control name='assunto' onChange={this.handleFormChange} type='text'></Form.Control>
                    <br></br>
                    <Button onClick={this.buscarAtividade.bind(this)}>Buscar</Button>
                </Form.Group>

            </Form>
        </div>

        return (<div>
            {form}
            {this.state.table}
        </div>
        )
    }
}