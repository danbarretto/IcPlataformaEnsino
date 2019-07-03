import React from 'react'
import Table from 'react-bootstrap/Table'
import AulaDisplay from './AulaDisplay'
class AulaTable extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            elementArray: [],
            currAula:null,
            showAula: false,
        }

    }


    getLectures() {
        fetch(`http://localhost:5000/api/getLectures?id=${localStorage.getItem("id")}`, {
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

    updateCurrElement(newElem) {
        this.setState({currAula:(<AulaDisplay 
            element={newElem}></AulaDisplay>),
            showAula:true
    })
    }
    componentDidMount() {
        this.getLectures()
    }
    render() {
        return (<div>
            <Table striped bordered hover>
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
            {this.state.showAula && this.state.currAula}
        </div>);
    }
}


export default AulaTable