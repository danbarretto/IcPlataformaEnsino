import React from 'react'
import Table from 'react-bootstrap/Table'
import AulaDisplay from './AulaDisplay'
class AulaTable extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            elementArray: [],
            currAula: null,
            showAula: false,
        }

    }


    getLectures() {
        fetch(`/api/getLectures?id=${localStorage.getItem("id")}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res => {

            res.json().then(result => {
                let elementTemp = [];
                result.forEach(element => {
                    elementTemp.push(<tr key={element.id} onClick={() => {
                        this.updateCurrElement(element)
                    }}>
                        <td>{element.titulo}</td>
                        <td>{element.materia}</td>
                        <td>{element.assunto}</td>
                        <td>{element.tipo}</td>
                    </tr>)

                });
                this.setState({ elementArray: elementTemp })
            })
        })
    }

    buscarAula() {
        if (this.state.titulo === '') {
            alert("Preencha o campo obrigatório")
            return
        }
        fetch(`/api/searchLect?titulo=${this.props.titulo}&assunto=${this.props.assunto}&materia=${this.props.materia}&tipo=${this.props.tipo}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res => {
            let temp = []
            res.json().then(result => {
                console.log(result)
                if (result[0] === undefined) {
                    alert("Nenhuma aula encontrada")
                } else {

                    result.forEach(element => {
                        temp.push(<tr key={element.id} onClick={() => this.updateCurrElement(element)}>
                            <td>{element.titulo}</td>
                            <td>{element.materia}</td>
                            <td>{element.assunto}</td>
                            <td>{element.tipo}</td>
                        </tr>)
                    });
                    this.setState({elementArray:temp})
                }
            })
        })
    }

    updateCurrElement(newElem) {

        this.setState({
            currAula: (<AulaDisplay
                element={newElem}></AulaDisplay>),
            showAula: true
        })
    }
    componentDidMount() {
        if (this.props.option == 1)
            this.getLectures()
        else
            this.buscarAula()

    }
    render() {
        return (<div>
            <Table striped bordered hover style={{ backgroundColor: "#F8F8F8" }}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Matéria</th>
                        <th>Assunto</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.elementArray}
                </tbody>
            </Table>
            <br></br>
            {this.state.showAula && this.state.currAula}
        </div>);
    }
}


export default AulaTable