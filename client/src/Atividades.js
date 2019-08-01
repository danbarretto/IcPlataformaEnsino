import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav'
import AtividadeDisplay from './components/atividades/AtividadeDisplay';
import CriarAtividade from './components/atividades/CriarAtividade';
import Submisssoes from './components/atividades/Submissoes';
import BuscaAtividade from './components/atividades/BuscaAtividade';

class Atividades extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showActivities: true,
            createActivity: false,
            searchActivity: false,
            submissions:false
        }
        this.searchActivities = this.searchActivities.bind(this)
        this.showActivities = this.showActivities.bind(this)
        this.createActivity = this.createActivity.bind(this)
        this.showSubmissions = this.showSubmissions.bind(this)
    }

    searchActivities() {
        this.setState({
            showActivities: false,
            createActivity: false,
            searchActivity: true,
            submissions:false
        })
    }

    showActivities() {
        this.setState({
            showActivities: true,
            createActivity: false,
            searchActivity: false,
            submissions:false
        })
    }

    createActivity() {
        this.setState({
            showActivities: false,
            createActivity: true,
            searchActivity: false,
            submissions:false
        })
    }

    showSubmissions(){
        this.setState({
            showActivities: false,
            createActivity: false,
            searchActivity: false,
            submissions:true

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
                        <Nav.Link eventKey='submissoes' onClick={this.showSubmissions}>
                            Submissões
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="buscarAtividade" onClick={this.searchActivities}>
                            Buscar Atividades
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
        } else {
            if (!alert("Você deve realizar login primeiro!"))
                window.location.replace('/')
        }
        return (<div>
            <NavBar></NavBar>
            <Jumbotron className='fill'>
                <div className='container' style={{ backgroundColor: '#F8F8F8', borderRadius: '5px', padding: '10px' }}>
                    <h1>Atividades</h1>
                    {atividadeNav}
                    <br></br>
                    <br></br>
                    <br></br>
                    {this.state.showActivities && <AtividadeDisplay></AtividadeDisplay>}
                    {this.state.createActivity && <CriarAtividade></CriarAtividade>}
                    {this.state.searchActivity && <BuscaAtividade></BuscaAtividade>}
                    {this.state.submissions && <Submisssoes></Submisssoes>}
                </div>
            </Jumbotron>
            <Footer></Footer>
        </div>)
    }
}

export default Atividades