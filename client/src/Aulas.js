import React from "react";
import NavBar from "./components/NavBar";
import Footer from './components/Footer'
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import CriarAula from './components/CriarAula'
import AulaDisplay from './components/AulaDisplay'

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
              {this.state.showLect && <AulaDisplay></AulaDisplay>}
          </div>

        </Jumbotron>
        <Footer></Footer>
      </div>
    );
  }
}

export default Aulas;
