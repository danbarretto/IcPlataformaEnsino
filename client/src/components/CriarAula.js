import React from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";

class CriarAula extends React.Component {

    constructor(...args){
        super(...args)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
          materia:"Matéria"
        }
    }

  handleChange(e){
        this.setState({materia:e.target.name})
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="2">
            <DropdownButton
              id="dropdown-item-button"
              title={this.state.materia}
            >
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Português"
                as="button"
              >
                Português
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Matemática"
                as="button"
              >
                Matemática
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="História"
                as="button"
              >
                História
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Geografia"
                as="button"
              >
                Geografia
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Filosofia"
                as="button"
              >
                Filosofia
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Sociologia"
                as="button"
              >
                Sociologia
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Química"
                as="button"
              >
                Química
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Física"
                as="button"
              >
                Física
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => this.handleChange(e)}
                name="Biologia"
                as="button"
              >
                Biologia
              </Dropdown.Item>
            </DropdownButton>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Título</Form.Label>
            <Form.Control required type="text" />
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

export default CriarAula;
