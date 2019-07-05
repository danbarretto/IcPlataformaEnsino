import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import MateriaPanel from './MateriaPanel'
import Dropdown from 'react-bootstrap/Dropdown'
export default class BuscarAula extends React.Component {




    render() {
        return (<div>
            <h2 style={{paddingLeft:'25%'}}>Selecione a Matéria</h2>
            <MateriaPanel></MateriaPanel>
            <Form>
                <Form.Group as={Col} md='5'>
                    <Form.Label>Título</Form.Label>
                    <Form.Control type='text'></Form.Control>
                </Form.Group>
            </Form>
        </div>)
    }
}