import React from "react";
import NavBar from "./components/NavBar";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Table from "react-bootstrap/Table";
import CriarAula from './components/CriarAula'
class Aulas extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
        showLect:false,
        createLect:false
    };
    this.showLectures = this.showLectures.bind(this);
    this.createLecture = this.createLecture.bind(this);
  }

  showLectures() {
    if(this.state.createLect){
        this.setState({createLect:false, showLect:true})
    }else{
        this.setState({showLect:true})
    }
}

  createLecture() {
    if(this.state.showLect){
        this.setState({showLect:false, createLect:true})
    }else{
        this.setState({createLect:true})
    }
  }

  render() {
    const tableTest = (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Matéria</th>
            <th>Assunto</th>
            <th>Tipo de Aula</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Geografia</td>
            <td>Curvas de Nível</td>
            <td>Slide</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Matemática</td>
            <td>Funções</td>
            <td>Texto</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Português</td>
            <td>Machado de Assis</td>
            <td>Vídeo</td>
          </tr>
        </tbody>
      </Table>
    );

    return (
      <div>
        <NavBar />
        <Jumbotron>
          <h1>Aulas</h1>
          <Button variant="primary" onClick={this.showLectures}>
            Suas Aulas
          </Button>
          <Button variant="secondary" onClick={this.createLecture}>
            Criar Aula
          </Button>
          <br></br>
          <br></br>
          <br></br>
          <div>
              {this.state.createLect && <CriarAula></CriarAula>}
              {this.state.showLect && tableTest}
          </div>

        </Jumbotron>
      </div>
    );
  }
}

export default Aulas;
