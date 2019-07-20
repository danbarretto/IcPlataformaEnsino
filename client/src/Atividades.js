import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav'

class Atividades extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showActivities:true,
            createActivity:false,
            searchActivity:false
        }
        this.searctActivities = this.searctActivities.bind(this)
        this.showActivities = this.showActivities.bind(this)
        this.createActivity = this.createActivity.bind(this)
    }

    searctActivities(){
        this.setState({
            showActivities:false,
            createActivity:false,
            searchActivity:true
        })
    }

    showActivities(){
        this.setState({
            showActivities:true,
            createActivity:false,
            searchActivity:false
        })
    }

    createActivity(){
        this.setState({
            showActivities:false,
            createActivity:true,
            searchActivity:false
        })
    }

    render() {
        let atividadeNav
        if (localStorage.getItem('permissao') === '2') {
            atividadeNav =
                <Nav variant='tabs' defaultActiveKey="buscarAtividade">
                    <Nav.Item>
                        <Nav.Link eventKey="buscarAtividade" onClick={this.searctActivities}>
                            Buscar Atividades
              </Nav.Link>
                    </Nav.Item>
                </Nav>
        } else if (localStorage.getItem('permissao') === '1') {
            atividadeNav =
                <Nav variant='tabs' defaultActiveKey="suasAtividades">
                    <Nav.Item>

                        <Nav.Link eventKey="suasAtividades" onClick={this.showActivities}>
                            Suas Atividades
          </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>

                        <Nav.Link eventKey="criarAtividade" onClick={this.createActivity}>
                            Criar Atividades
              </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="buscarAtividade" onClick={this.searctActivities}>
                            Buscar Aulas
              </Nav.Link>
                    </Nav.Item>
                </Nav>
        }
        return (<div>
            <NavBar></NavBar>
            <Jumbotron style={{height:'100%'}}>
                <h1>Atividades</h1>
                {atividadeNav}
                <br></br>
                <br></br>
                <br></br>
                {this.state.showActivities && 'a'}
                {this.state.createActivity && 'b'}
                {this.state.searchActivity && 'c'}
            </Jumbotron>
            <Footer></Footer>
        </div>)
    }
}

export default Atividades