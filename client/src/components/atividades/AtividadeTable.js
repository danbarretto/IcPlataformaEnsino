import React from 'react'
import Table from 'react-bootstrap/Table';

export default class AtividadeTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tableHead: null,
            content:null
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
                let temp =[]
                res.json().then(result=>{
                    result.forEach(element => {
                        temp.push(<tr>
                            <td>{element.titulo}</td>
                            <td>{element.materia}</td>
                            <td>{element.assunto}</td>
                            <td>{element.tipo}</td>
                            <td>{element.pontuacao}</td>
                        </tr>)
                    });
                    this.setState({content:temp})
                })
            })
    }

    componentDidMount(){
        this.getActivities()
    }
    render() {
        return (
            <Table striped bordered hover style={{ backgroundColor: "#F8F8F8" }}>
                {this.state.tableHead}
                <tbody>
                    {this.state.content}
                </tbody>
            </Table>)
    }
}