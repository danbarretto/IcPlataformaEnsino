import React from "react";
import NavBar from "./components/NavBar";
import Footer from './components/Footer'
import Jumbotron from "react-bootstrap/Jumbotron";
import CriarAula from './components/CriarAula'
import AulaTable from './components/AulaTable'
import Nav from 'react-bootstrap/Nav'


class Aulas extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showLect: true,
      createLect: false
    };
    this.showLectures = this.showLectures.bind(this);
    this.createLecture = this.createLecture.bind(this);
  }

  showLectures() {
    if (this.state.createLect) {
      this.setState({ createLect: false, showLect: true })
    } else {
      this.setState({ showLect: true })
    }
  }

  createLecture() {
    if (this.state.showLect) {
      this.setState({ showLect: false, createLect: true })
    } else {
      this.setState({ createLect: true })
    }
  }

  render() {
    return (
      <div >
        <NavBar />
        <Jumbotron style={{ minHeight: '100%' }}>
              <h1>Aulas</h1>
          <Nav variant='tabs' defaultActiveKey="suasAulas">
            <Nav.Item>

              <Nav.Link  eventKey="suasAulas" onClick={this.showLectures}>
                Suas Aulas
          </Nav.Link>
            </Nav.Item>
            <Nav.Item>

              <Nav.Link eventKey="criarAula"onClick={this.createLecture}>
                Criar Aula
              </Nav.Link>
            </Nav.Item>
      
          </Nav>
            <br></br>
            <br></br>
            <br></br>
          <div>
              {this.state.createLect && <CriarAula></CriarAula>}
              {this.state.showLect && <AulaTable ></AulaTable>}
            </div>
        </Jumbotron>
        <Footer></Footer>
      </div>
    );
  }
}

export default Aulas;
