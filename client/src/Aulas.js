import React from "react";
import NavBar from "./components/NavBar";
import Footer from './components/Footer'
import Jumbotron from "react-bootstrap/Jumbotron";
import CriarAula from './components/CriarAula'
import AulaTable from './components/AulaTable'
import Nav from 'react-bootstrap/Nav'
import BuscarAula from './components/BuscarAula'

class Aulas extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showLect: true,
      createLect: false,
      searchLect: false,
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
    return (
      <div >
        <NavBar />
        <Jumbotron style={{ minHeight: '100%' }}>
          <h1>Aulas</h1>
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
          <br></br>
          <br></br>
          <br></br>
          <div>
            {this.state.createLect && <CriarAula></CriarAula>}
            {this.state.showLect && <AulaTable ></AulaTable>}
            {this.state.searchLect && <BuscarAula></BuscarAula>}
          </div>
        </Jumbotron>
        <Footer></Footer>
      </div>
    );
  }
}

export default Aulas;
