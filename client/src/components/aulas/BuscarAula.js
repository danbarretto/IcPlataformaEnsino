import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import AulaTable from './AulaTable';


export default class BuscarAula extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            materia: '',
            tipo: '',
            assunto: '',
            titulo: '',
            table: null,
            tableElements: [],
            showTable: false,
            hideContent: false,
        }
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    buscarAula() {
        if (this.state.titulo !== '')
            this.setState({
                table: <AulaTable
                    option='2'
                    titulo={this.state.titulo}
                    materia={this.state.materia}
                    tipo={this.state.tipo}
                    assunto={this.state.assunto}
                    hideContent={this.hidePageContent}
                ></AulaTable>, showTable: true
            })
        else
            alert("Preencha os campos obrigatórios!")
    }


    hidePageContent = () => {
        this.setState({ hideContent: true })
    }

    render() {
        let form = <div>
            <Form>

                <Form.Group>
                    <Form.Label>Título (obrigatório)</Form.Label>
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
                        <option>Texto</option>
                        <option>Slide</option>
                        <option>Vídeo</option>
                        <option>Executável</option>
                        <option>Jogo Web</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Assunto</Form.Label>
                    <Form.Control name='assunto' onChange={this.handleFormChange} type='text'></Form.Control>
                    <br></br>
                    <Button onClick={this.buscarAula.bind(this)}>Buscar</Button>
                </Form.Group>

            </Form>
        </div>

        return (<div>
            {!this.state.hideContent && form}
            {this.state.showTable && this.state.table}

        </div>)
    }
}