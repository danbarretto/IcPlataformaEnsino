import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
export default class MultiplaEscolha extends React.Component {


    constructor(props) {
        super(props)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.state = {


        }
    }

    handleAnswer(event) {
        if (this.props.answer === event.target.name) {
            alert("Certo")
        } else {
            alert('Errado')
        }
    }

    render() {
        const btnStyle = { width: '40%', padding: '10px', margin: '10px' }
        return (
            <div className='container'>
                <div style={{ padding: '10px', backgroundColor: '#F8F8F8', borderRadius: '5px', }}>
                    {this.props.enunciado}
                </div>
                <div>
                    <Row>
                        <Button style={btnStyle} name='1' onClick={this.handleAnswer} variant='info'>{this.props.op1}</Button>
                        <Button style={btnStyle} name='2' onClick={this.handleAnswer} variant='danger'>{this.props.op2}</Button>
                    </Row>
                    <Row>
                        <Button style={btnStyle} name='3' onClick={this.handleAnswer} variant='success'>{this.props.op3}</Button>
                        <Button style={btnStyle} name='4' onClick={this.handleAnswer} variant='warning'>{this.props.op4}</Button>
                    </Row>
                </div>
            </div>
        )
    }
}