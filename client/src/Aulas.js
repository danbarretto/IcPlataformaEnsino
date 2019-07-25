import React from "react";
import NavBar from "./components/NavBar";
import Footer from './components/Footer'
import Jumbotron from "react-bootstrap/Jumbotron";
import CriarAula from './components/aulas/CriarAula'
import AulaTable from './components/aulas/AulaTable'
import Nav from 'react-bootstrap/Nav'
import BuscarAula from './components/aulas/BuscarAula'

class Aulas extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showLect: true,
      createLect: false,
      searchLect: false
    };
    this.showLectures = this.showLectures.bind(this);
    this.createLecture = this.createLecture.bind(this);
    this.searchLecture = this.searchLecture.bind(this)
  }

  showLectures() {

    this.setState({
      createLect: false,
      searchLect: false,
      showLect: true
    })

  }

  createLecture() {

    this.setState({
      showLect: false,
      searchLect: false,
      createLect: true
    })

  }

  searchLecture() {

    this.setState({
      showLect: false,
      searchLect: true,
      createLect: false
    })

  }

  render() {
    let aulaNav
    if (localStorage.getItem('permissao') === '2') {
      aulaNav =
        <Nav variant='tabs' defaultActiveKey="suasAulas">
          <Nav.Item>
            <Nav.Link eventKey="buscarAula" onClick={this.searchLecture}>
              Buscar Aulas
              </Nav.Link>
          </Nav.Item>
        </Nav>
    } else if (localStorage.getItem('permissao') === '1') {
      aulaNav =
        <Nav variant='tabs' defaultActiveKey="suasAulas">
          <Nav.Item>

            <Nav.Link eventKey="suasAulas" onClick={this.showLectures}>
              Suas Aulas
          </Nav.Link>
          </Nav.Item>
          <Nav.Item>

            <Nav.Link eventKey="criarAula" onClick={this.createLecture}>
              Criar Aula
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="buscarAula" onClick={this.searchLecture}>
              Buscar Aulas
              </Nav.Link>
          </Nav.Item>
        </Nav>
    }else{
      if (!alert("Você deve realizar login primeiro!"))
        window.location.replace('/')
    }
    return (
      <div >
        <NavBar />
        <Jumbotron >
          <div className='container' style={{backgroundColor:'#F8F8F8', borderRadius:'5px', padding:'10px'}}>

            <h1>Aulas</h1>

            {aulaNav}
            <br></br>
            <br></br>
            <br></br>
            <div>
              {this.state.createLect && <CriarAula></CriarAula>}
              {this.state.showLect && <AulaTable option='1' ></AulaTable>}
              {this.state.searchLect && <BuscarAula></BuscarAula>}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
          </div>
        </Jumbotron>
        <Footer position={this.state.position}></Footer>
      </div>
    );
  }
}

export default Aulas;
