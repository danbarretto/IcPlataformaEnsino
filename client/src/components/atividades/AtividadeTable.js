import React from 'react'
import Table from 'react-bootstrap/Table';

export default class AtividadeTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tableHead: null,
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

            })
    }

    render() {
        return (
            <Table striped bordered hover style={{ backgroundColor: "#F8F8F8" }}>

            </Table>)
    }
}