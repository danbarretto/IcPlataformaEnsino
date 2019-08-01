import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AtividadeTable from './AtividadeTable';
import MultiplaEscolha from './multiplaEscolha/MultiplaEscolha'
import QuestaoAberta from './questaoAberta/QuestaoAberta'
import CompletarLacunas from './completarLacunas/CompletarLacunas'
import InputGroup from 'react-bootstrap/InputGroup'
export default class BuscaAtividade extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            materia: '',
            tipo: '',
            assunto: '',
            titulo: '',
            table: null,
            showForm: false,
            rendered: null
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
                    onChangeActivitie={this.changeCurrentActivitie}

                />
            })
        }
    }

    changeCurrentActivitie = (activitie) => {
        this.setState({ showForm: false })
        let data = JSON.parse(activitie.jsonAtividade)
        switch (activitie.tipo) {
            case "Múltipla Escolha":
                this.setState({
                    rendered: <MultiplaEscolha
                        key={activitie.id}
                        data={data}
                        pontuacao={activitie.pontuacao}
                        id={activitie.id}
                        testing={false}
                    />
                })
                break;
            case "Completar Lacunas":
                this.setState({
                    rendered: <CompletarLacunas
                        key={activitie.id}
                        data={data}
                        pontuacao={activitie.pontuacao}
                        id={activitie.id}
                    ></CompletarLacunas>
                })
                break;
            case "Questão Aberta":
                this.setState({
                    rendered: <QuestaoAberta
                        key={activitie.id}
                        data={data}
                        pontuacao={activitie.pontuacao}
                        id={activitie.id}
                    ></QuestaoAberta>
                })
                break;
            default:
                break;
        }
    }

    render() {
        let form = <div>
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
        </div>

        return (<div>
            <Form>
                <Form.Group>
                    <Form.Label>Assunto (obrigatório)</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend id='basic-addon1'>
                            <InputGroup.Text>
                                &#128270;
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control name='assunto' onChange={this.handleFormChange} type='text'></Form.Control>
                    </InputGroup>

                </Form.Group>
                {this.state.showForm && form}
                    <Button style={{ marginTop: '10px' }} onClick={() => this.setState({ showForm: !this.state.showForm })}>
                        {!this.state.showForm ? "Mais Filtros" : "Menos Filtros"}
                    </Button>
                <Form.Group>

                    <br></br>
                    <Button onClick={this.buscarAtividade.bind(this)}>Buscar</Button>
                </Form.Group>

            </Form>
            {this.state.table}
            {this.state.rendered}
        </div>
        )
    }
}