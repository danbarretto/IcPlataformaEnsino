import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'react-quill/dist/quill.snow.css';
import MultiplaEscolhaEditor from "./MultiplaEscolhaEditor";

class CriarAtividade extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      materia: "Matéria",
      tipo: "Tipo de Aula",
      rendered: null,
      text: "",
      titulo: "",
      assunto: "",
      activitieJson: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleChange2(e) {
    this.setState({ tipo: e.target.value });
    if (e.target.value === "Múltipla Escolha") {
      this.setState({
        rendered: (
          <MultiplaEscolhaEditor
            onJsonFinished={this.handleJson}
          ></MultiplaEscolhaEditor>
        )
      });
    }

  }

  handleSubmit() {
    if (this.state.titulo !== '' && this.state.assunto !== '' && this.state.materia !== ''
      && this.state.pontuacao !== '' && this.state.tipo !== '') {
      if (this.state.activitieJson !== '') {

        const data = {
          id: localStorage.getItem("id"),
          titulo: this.state.titulo,
          materia: this.state.materia,
          tipo: this.state.tipo,
          activitieJson: this.state.activitieJson,
          assunto: this.state.assunto,
          pontuacao: this.state.pontuacao
        }

        fetch('/api/insereAtividade', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => {
          if (res.ok) {
            if (!alert("Atividade criada com sucesso!"))
              window.location.reload()
          }
        })
      } else {
        alert("Finalize a atividade editada!")
      }
    } else {
      alert("Preencha todos os campos!")
    }
  }

  handleJson = (jsonValue) => {
    this.setState({ activitieJson: jsonValue })
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <Form className='container'>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" name="titulo" onChange={this.handleFormChange} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Matéria</Form.Label>
          <Form.Control defaultValue='Selecione uma Matéria' as="select" name="materia" onChange={this.handleFormChange}>
            <option disabled="disabled">Selecione uma Matéria</option>
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
        <Form.Group>
          <Form.Label>Assunto</Form.Label>
          <Form.Control name="assunto" onChange={this.handleFormChange} type="text"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Pontuação</Form.Label>
          <Form.Control name="pontuacao" maxLength={4} onChange={this.handleFormChange} type="number"></Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Tipo de Atividade</Form.Label>
          <Form.Control defaultValue='Selecione um tipo de Atividade' as="select" onChange={this.handleChange2.bind(this)}>
            <option disabled="disabled">Selecione um tipo de Atividade</option>
            <option>Múltipla Escolha</option>
            <option>Completar Lacunas</option>
            <option>Verdadeiro ou Falso</option>
            <option>Questão Aberta</option>
            <option>Associar Conceitos</option>
            <option>Encontre o Erro</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {this.state.rendered}

        </Form.Group>
        <Button onClick={this.handleSubmit.bind(this)}>Enviar</Button>
      </Form>
    );
  }
}

export default CriarAtividade;
