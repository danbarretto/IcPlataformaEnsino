import React from 'react'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import MultiplaEscolha from './MultiplaEscolha';

export default class MultiplaEscolhaEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            enunciado: '',
            op1: '',
            op2: '',
            op3: '',
            op4: '',
            chosen: '1',
            enunciadoEdited: false,
            op1Edited: false,
            op2Edited: false,
            op3Edited: false,
            op4Edited: false,
            editing: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRadioSelect = this.handleRadioSelect.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            [`${name}Edited`]: true
        });
    }

    handleRadioSelect(selected) {
        console.log(selected)
        this.setState({ chosen: selected })
    }

    componentDidUpdate() {
        if (this.state.enunciadoEdited && this.state.op1Edited
            && this.state.op2Edited && this.state.op3Edited && this.state.op4Edited) {
            let data = {
                enunciado: this.state.enunciado,
                op1: this.state.op1,
                op2: this.state.op2,
                op3: this.state.op3,
                op4: this.state.op4,
                answer: this.state.chosen
            }
            console.log(JSON.stringify(data))
        }
    }

    handleClick() {
        this.setState({ editing: !this.state.editing })
    }

    render() {
        const styleLeft = { width: '300px',maxHeight:'150px', height: '50px', marginRight: '15px' }
        const styleRight = { width: '300px', maxHeight: '150px', height: '50px' }
        let form = (<Form>
            <Form.Label>Enunciado</Form.Label>
            <Form.Control
                as='textarea'
                onChange={this.handleChange}
                name='enunciado'
                defaultValue={this.state.enunciado}></Form.Control>
            <Form.Label>Edite as opções e escolha a correta</Form.Label>
            <InputGroup>

                <Row style={{ padding: '15px' }}>
                    <InputGroup.Prepend >
                        <InputGroup.Radio
                            checked={true}
                            onClick={() => this.handleRadioSelect('1')}
                            name='options'></InputGroup.Radio>
                    </InputGroup.Prepend>

                    <Form.Control
                        as='textarea' 
                        name='op1'
                        onChange={this.handleChange}
                        style={styleLeft}
                        defaultValue={this.state.op1}></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        Você deve preencher esta opção
                        </Form.Control.Feedback>
                    <InputGroup.Prepend>
                        <InputGroup.Radio onClick={() => this.handleRadioSelect('2')} name='options'></InputGroup.Radio>
                    </InputGroup.Prepend>
                    <Form.Control
                        as='textarea'
                        name='op2'
                        onChange={this.handleChange}
                        style={styleRight}
                        defaultValue={this.state.op2}></Form.Control>
                </Row>
                <Row style={{ padding: '15px' }}>
                    <InputGroup.Prepend>
                        <InputGroup.Radio onClick={() => this.handleRadioSelect('3')} name='options'></InputGroup.Radio>
                    </InputGroup.Prepend>
                    <Form.Control
                        as='textarea'
                        name='op3'
                        onChange={this.handleChange}
                        style={styleLeft}
                        defaultValue={this.state.op3}
                        fluid ></Form.Control>
                    <InputGroup.Prepend>
                        <InputGroup.Radio onClick={() => this.handleRadioSelect('4')} name='options'></InputGroup.Radio>
                    </InputGroup.Prepend>
                    <Form.Control
                        as='textarea'
                        name='op4'
                        onChange={this.handleChange}
                        style={styleRight}
                        defaultValue={this.state.op4}></Form.Control>
                </Row>
            </InputGroup>




        </Form>)
        let visualization = <MultiplaEscolha
            op1={this.state.op1}
            op2={this.state.op2}
            op3={this.state.op3}
            op4={this.state.op4}
            enunciado={this.state.enunciado}
            answer={this.state.enunciado}
        ></MultiplaEscolha>


        return (
            <div>
                {this.state.editing && form}
                {!this.state.editing && visualization}
                <div style={{marginTop:'10px'}}>

                    <Button style={{ marginRight: '15px' }} onClick={this.handleClick.bind(this)}>{this.state.editing ? 'Visualizar' : 'Editar'}</Button>
                    <Button variant='success' >Finalizar</Button>
                </div>
            </div>


        )
    }
}