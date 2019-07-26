import React from 'react'
import Table from 'react-bootstrap/Table';

export default class Submisssoes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [],
            resposta: ''
        }
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
                jsonRes.forEach(element => {
                    temp.push(
                        <tr key={element.id} onClick={() => this.setState({ resposta: element.jsonAtividade })}>
                            <td>{element.titulo}</td>
                            <td>{element.nome + ' ' + element.sobrenome}</td>
                            <td>{element.statusAtividade}</td>
                        </tr>)
                    
                });
                this.setState({ content: temp })
            })
        })
    }
    componentDidMount() {
        this.getSubmissions()
    }

    render() {
        return (
            <div>

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
                {this.state.resposta}
            </div>
        )
    }
}