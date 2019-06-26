import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class CriarAula extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      materia: "Matéria",
      tipo: "Tipo de Aula",
      rendered: null,
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState
    });
  };
  post(url, formData) {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => {
      console.log("Response: " + res);
    });
  }

  onFileChange(e) {
    let file = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = e => {
      //console.warn("data: ", e.target.result);
      const url = "http://localhost:5000/api/fileReceive";
      const formData = { file: e.target.result };
      return this.post(url, formData);
    };
  }

  handleChange(e) {
    this.setState({ materia: e.target.name });
  }
  handleChange2(e) {
    this.setState({ tipo: e.target.value });
    if (e.target.value === "Texto") {
      this.setState({
        rendered: (
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Conteúdo</Form.Label>
            <Editor
              editorState={this.state.editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange.bind(this)}
            />
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
              onChange={this.onFileChange.bind(this)}
            />
          </div>
        )
      });
    }
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Matéria</Form.Label>
          <Form.Control as="select" onChange={this.handleChange.bind(this)}>
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
            <option>Texto</option>
            <option>Vídeo</option>
            <option>Slide</option>
            <option>Executável</option>
            <option>Jogo Web</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {this.state.rendered}
        </Form.Group>
        <Button>Enviar</Button>
      </Form>
    );
  }
}

export default CriarAula;
