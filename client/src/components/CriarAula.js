import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import axios from 'axios'

class CriarAula extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      materia: "Matéria",
      tipo: "Tipo de Aula",
      rendered: null,
      text: "",
      titulo:"",
      assunto:"",
      file:null

    };
    this.handleFormChange = this.handleFormChange.bind(this) 
   }

  async criaAula(){
    this.handleFileUpload()
    try {
      var data = {
        materia:this.state.materia,
        tipo:this.state.tipo,
        text:this.state.text,
        titulo:this.state.titulo,
        assunto:this.state.assunto,
        idCriador:localStorage.getItem("id"),
        fileName:this.state.file.name

      };
      if (data !== undefined) {
        fetch("/api/insereAula", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => {
          this.setState({ accountOk: res.ok });
          if (res.ok) {
            if (alert("Aula criada com sucesso!")) {
            } else {
              //redirecionar para profile
              window.location.reload();
            }
          }
        });
      }
    } catch (error) {
      console.log(`Erro! : ${error}`);
    }
  }

  handleFileSelect = event =>{
    this.setState({file:event.target.files[0]})
  }

  handleFileUpload = () =>{
    const fd = new FormData()
    fd.append("file", this.state.file, this.state.file.name)
    axios.post("/api/fileReceive", fd)
      .then(res => {
        console.log(res)
      })
  }

  handleChange2(e) {
    this.setState({ tipo: e.target.value });
    if (e.target.value === "Texto") {
      this.setState({
        rendered: (
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Conteúdo</Form.Label>
            <ReactQuill style={{ backgroundColor: 'white' }} value={this.state.text} onChange={this.handleTextChange.bind(this)}></ReactQuill>
          </Form.Group>
        )
      });
    } else {
      this.setState({
        rendered: (
          <div>
            <input
              type="file"
              name="file"
              onChange={this.handleFileSelect}
            />
          </div>
        )
      });
    }
  }

  handleTextChange(value) {
    this.setState({ text: value })
  }

  handleFormChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    
    
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" name="titulo" onChange={this.handleFormChange}/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Matéria</Form.Label>
          <Form.Control as="select" name="materia" onChange={this.handleFormChange}>
            <option selected="selected" disabled="disabled">Selecione uma Matéria</option>
            <option>Português</option>
            <option>Matemática</option>
            <option>História</option>
            <option>Geografia</option>
            <option>Sociologia</option>
            <option>Filosofia</option>
            <option>Biologia</option>
            <option>Física</option>
            <option>Química</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Tipo de Aula</Form.Label>
          <Form.Control as="select" onChange={this.handleChange2.bind(this)}>
            <option selected="selected" disabled="disabled">Selecione um tipo de Aula</option>
            <option>Texto</option>
            <option >Vídeo</option>
            <option>Slide</option>
            <option>Executável</option>
            <option>Jogo Web</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {this.state.rendered}
        </Form.Group>
        <Form.Group>
          <Form.Label>Assunto</Form.Label>
          <Form.Control name="assunto" onChange={this.handleFormChange} type="text"></Form.Control>
        </Form.Group>
        <Button onClick={this.criaAula.bind(this)}>Enviar</Button>
      </Form>
    );
  }
}

export default CriarAula;
