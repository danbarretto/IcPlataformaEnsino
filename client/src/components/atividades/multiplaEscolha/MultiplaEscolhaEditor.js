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
            chosen: '',
            explicacao:'',
            editing: true,
            finished:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRadioSelect = this.handleRadioSelect.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleRadioSelect(selected) {
        this.setState({ chosen: selected })
    }


    handleClick() {
        if(this.state.finished) this.setState({finished:false})
        
        if (this.state.enunciado !== '' && this.state.op1 !== ''
            && this.state.op2 !== '' && this.state.op3 !== ''
            && this.state.op4 !== '' && this.state.chosen !== '' && this.state.explicacao!=='')
            this.setState({ editing: !this.state.editing })
        else
            alert("Preencha todos os campos!")
    }

    handleFinish = () => {
        if (this.state.enunciado !== '' && this.state.op1 !== ''
            && this.state.op2 !== '' && this.state.op3 !== ''
            && this.state.op4 !== '' && this.state.chosen !== '' && this.state.explicacao!=='') {
            let data = {
                enunciado: this.state.enunciado,
                op1: this.state.op1,
                op2: this.state.op2,
                op3: this.state.op3,
                op4: this.state.op4,
                answer: this.state.chosen,
                explicacao:this.state.explicacao
            }

            this.props.onJsonFinished(JSON.stringify(data))
            this.setState({editing:false, finished:true})
        } else {
            alert("Preencha todos os campos!")
        }
    }

    render() {
        const styleLeft = { width: '300px', maxHeight: '150px', height: '50px', marginRight: '15px' }
        const styleRight = { width: '300px', maxHeight: '150px', height: '50px' }
        let form = (<Form>
            <Form.Label>Enunciado</Form.Label>
            <Form.Control
                as='textarea'
                onChange={this.handleChange}
                name='enunciado'
                defaultValue={this.state.enunciado}></Form.Control>
            <br></br>
            <Form.Label>Edite as opções e escolha a correta</Form.Label>
            <InputGroup>

                <Row style={{ padding: '15px' }}>
                    <InputGroup.Prepend >
                        <InputGroup.Radio
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
            <Form.Label>Explicação</Form.Label>
            <Form.Control defaultValue={this.state.explicacao} onChange={this.handleChange} name='explicacao' as='textarea'></Form.Control>
        </Form>)
        let data={
            enunciado:this.state.enunciado,
            op1: this.state.op1,
            op2: this.state.op2,
            op3: this.state.op3,
            op4: this.state.op4,
            answer:this.state.chosen,
            explicacao:this.state.explicacao
        }
        let visualization = <MultiplaEscolha
            data={data}
            testing={true}
            
        ></MultiplaEscolha>


        return (
            <div>
                {this.state.editing && form}
                {!this.state.editing && visualization}
                <div style={{ marginTop: '10px' }}>

                    <Button style={{ marginRight: '15px' }} onClick={this.handleClick.bind(this)}>{this.state.editing ? 'Visualizar' : 'Editar'}</Button>
                    {!this.state.finished && <Button variant='success' onClick={this.handleFinish}>Finalizar</Button>}
                </div>
            </div>


        )
    }
}