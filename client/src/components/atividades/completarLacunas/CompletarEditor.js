import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default class CompletarEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showTextBox: false,
            lacuna: '',
            texto: '',
            lacunas: [],
            btnDisabled:false
        }
        this.adicionarLacuna = this.adicionarLacuna.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.textRef = React.createRef()
        this.lacunaRef = React.createRef()
    }

    adicionarLacuna() {
        if (this.state.lacuna !== '') {
            this.textRef.current.value = this.state.texto.concat(` <lacuna>${this.state.lacuna}</lacuna>`)
            this.setState({ texto: this.textRef.current.value})
            this.lacunaRef.current.value = ''
            let temp = this.state.lacunas
            temp.push(this.state.lacuna)
            this.setState({ lacunas: temp, btnDisabled:true })
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        if(name==='lacuna'){
            this.setState({btnDisabled:false})
        }
        this.setState({
            [name]: value
        });
    }

    handleFinish(){
        if(this.state.texto!=='' && this.state.lacunas.length!==0){
            let data = {
                texto:this.state.texto,
                lacunas:this.state.lacunas,
            }
            this.props.onJsonFinished(JSON.stringify(data))
        }else{
            alert("Texto inválido!\nVocê precisa adicionar ao menos 1 lacuna!")
        }
    }

    render() {
        let form = <Form>
            <Form.Label>Texto do exercício</Form.Label>
            <Form.Group as={Col}>

                <Form.Control ref={this.textRef} name='texto' onChange={this.handleChange} as='textarea'></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Texto da Lacuna</Form.Label>
                <Form.Control ref={this.lacunaRef} name='lacuna' onChange={this.handleChange}></Form.Control>
                <Button disabled={this.state.lacuna==='' || this.state.btnDisabled} onClick={this.adicionarLacuna} style={{ marginTop: '10px' }}>Adicionar Lacuna</Button>
            </Form.Group>

        </Form>
        return (<div>
            {form}
            <Button style={{marginRight:'15px'}}>Visualizar</Button>
            <Button variant='success' onClick={this.handleFinish.bind(this)}>Finalizar</Button>
        </div>)
    }
}