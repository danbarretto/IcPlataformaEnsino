import React from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"

export default class Submisssoes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [],
            resposta: '',
            showAnswer: false,
            enunciado: '',
            suaResposta: '',
            value: 0,
            feedback: '',
            idAluno: -1,
            idAtividade: -1,
            showTable: true

        }
        this.handleChange = this.handleChange.bind(this)
    }

    getSubmissions = () => {
        fetch('/api/getSubmissions?id=' + localStorage.getItem('id'), {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => {
            let temp = []
            res.json().then(jsonRes => {
                let i=0
                jsonRes.forEach(element => {
                    i++
                    temp.push(
                        <tr key={element.id} style={{ cursor: 'pointer' }} onClick={() => {
                            let jsonData = JSON.parse(element.jsonAtividade)
                            console.log(element)
                            this.setState({
                                showAnswer: true,
                                resposta: element.resposta,
                                enunciado: jsonData.enunciado,
                                suaResposta: jsonData.resposta,
                                idAluno: element.idUsuario,
                                idAtividade: element.idAtividade,
                                value: 0,
                                feedback: '',
                                pontuacaoFinal: element.pontuacao
                            })
                        }}>
                            <td>{element.titulo}</td>
                            <td>{element.nome + ' ' + element.sobrenome}</td>
                            <td>{element.statusAtividade}</td>
                        </tr>)

                });
                if(i===0) this.setState({showTable:false})
                this.setState({ content: temp })
            })
        })
    }
    componentDidMount() {
        this.getSubmissions()
    }


    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSlider(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit() {
        const feedbackNota = this.state.feedback.concat('\n\nNota Final: ' + this.state.pontuacaoFinal * (this.state.value / 100))
        let data = {
            idAluno: this.state.idAluno,
            idAtividade: this.state.idAtividade,
            feedback: feedbackNota,
            pontuacaoFinal: this.state.pontuacaoFinal * (this.state.value / 100)
        }
        
        fetch('/api/updateSubmit', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                if (!alert("Submissão atualizada com sucesso!")) {
                    window.location.reload()
                }
            }
        })
    }
    render() {
        const style = {
            backgroundColor: '#F8F8F8',
            borderRadius: '5px',
            padding: '10px'
        }
        let answerBox =
            <Jumbotron>

                <Form className='container'>
                    <h3>Enunciado:</h3>
                    <p style={style}>{this.state.enunciado}</p>
                    <h3>Resposta do Aluno</h3>
                    <p style={style}>{this.state.resposta}</p>
                    <h3>Sua Resposta:</h3>

                    <p style={style}>{this.state.suaResposta}</p>
                    <Form.Label>
                        Feedback
                    </Form.Label>
                    <Form.Control name='feedback' onChange={this.handleChange} as='textarea'></Form.Control>
                    <br />
                    <h5>Pontuação final: {this.state.value}%</h5>
                    <ReactBootstrapSlider
                        min={0}
                        max={100}
                        orientation='horizontal'
                        value={this.state.value}
                        change={this.handleSlider.bind(this)}
                        name='value'
                    />
                    <br />
                    <br />
                    <Button onClick={this.handleSubmit.bind(this)}>Enviar</Button>
                </Form>
            </Jumbotron>
        return (
            <div>
                {
                    this.state.showTable ? 
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Título da Atividade</th>
                                <th>Nome do Aluno</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.content}
                        </tbody>
                    </Table>
                    :
                        <h3>Você não possui nenhuma submissão pendente.</h3>
                }
                {this.state.showAnswer && answerBox}

            </div>
        )
    }
}