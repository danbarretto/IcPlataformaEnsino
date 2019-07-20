import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import MateriaPanel from '../MateriaPanel'
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



    handleSelect(e) {
        this.setState({ tipo: e.target.value })
    }

    buscarAula() {
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
    }
    getCurrentMateria = (newMateria) => {
        window.scrollBy(0, 500)
        this.setState({ materia: newMateria })
    }

    hidePageContent = () => {
        this.setState({ hideContent: true })
    }

    render() {
        let form = <div>
            <h2 style={{ paddingLeft: '25%' }}>Selecione a Matéria</h2>
            <MateriaPanel changeMateria={this.getCurrentMateria}></MateriaPanel>
            <Form style={{ paddingLeft: '25%' }}>
                <Form.Group as={Col} md='6'>
                    <Form.Label>Título (obrigatório)</Form.Label>
                    <Form.Control name='titulo' onChange={this.handleFormChange} type='text'></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md='6'>
                    <Form.Label>Tipo de Aula</Form.Label>
                    <Form.Control onChange={this.handleSelect} as='select'>
                        <option selected='selected' disabled='disabled'>Selecione um tipo de aula</option>
                        <option>Texto</option>
                        <option>Slide</option>
                        <option>Vídeo</option>
                        <option>Executável</option>
                        <option>Jogo Web</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md='6'>
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