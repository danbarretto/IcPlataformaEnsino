import React from 'react'
import Table from 'react-bootstrap/Table';
import MultiplaEscolha from './MultiplaEscolha';

export default class AtividadeTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tableHead: null,
            content: null,
            rendered: null
        }
    }

    getActivities() {
        this.setState({
            tableHead: (
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Matéria</th>
                        <th>Assunto</th>
                        <th>Tipo</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>)
        })
        fetch(`/api/getActivities?id=${localStorage.getItem('id')}`,
            {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }).then(res => {
                let temp = []
                res.json().then(result => {
                    result.forEach(element => {
                        temp.push(<tr style={{cursor:'pointer'}} onClick={() => this.changeCurrentActivitie(element)}>
                            <td>{element.titulo}</td>
                            <td>{element.materia}</td>
                            <td>{element.assunto}</td>
                            <td>{element.tipo}</td>
                            <td>{element.pontuacao}</td>
                        </tr>)
                    });
                    this.setState({ content: temp })
                })
            })
    }

    changeCurrentActivitie(activitie) {
        switch (activitie.tipo) {
            case "Múltipla Escolha":
                let data = JSON.parse(activitie.jsonAtividade)
                this.setState({
                    rendered:<MultiplaEscolha
                    enunciado={data.enunciado}
                    op1={data.op1}
                    op2={data.op2}
                    op3={data.op3}
                    op4={data.op4}
                    answer={data.answer}
                    />
            })

                break;
        }
    }

    componentDidMount() {
        this.getActivities()
    }
    render() {
        return (
            <div>

                <Table responsive striped bordered hover >
                    {this.state.tableHead}
                    <tbody>
                        {this.state.content}
                    </tbody>
                </Table>
                {this.state.rendered}
            </div>
        )
    }
}