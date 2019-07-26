import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
export default class MultiplaEscolha extends React.Component {


    constructor(props) {
        super(props)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.state = {
            showAnswer: false,
            showAnswerBox: false,
            feedback: '',
            disableBtns: false,
        }
        this.baseState = this.state
    }



    handleAnswer(event) {
        if (this.props.data.answer === event.target.name) {
            this.setState({
                feedback: 'Parabéns você acertou!',
                disableBtns: true,
                showAnswerBox: true,
            })
            event.target.style.boxShadow = '0 0 0 3px #2ecc71'
            if(!this.props.testing)
                this.registerScore()
        } else {
            this.setState({
                feedback: 'Poxa, não foi dessa vez.',
                showAnswerBox: true,
                disableBtns: true,

            })
            event.target.style.boxShadow = '0 0 0 3px #e74c3c'
        }

    }

    registerScore() {
        let data = {
            idUser: localStorage.getItem('id'),
            id: this.props.id,
            points: this.props.pontuacao,
            status:'Finalizada'
        }
        fetch('/api/updateScore', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res.body)
            if (res.ok) {
                console.log(parseInt(parseInt(localStorage.getItem('pontuacao'),10) + this.props.pontuacao, 10))
                localStorage.setItem('pontuacao', parseInt(parseInt(localStorage.getItem('pontuacao'), 10) + this.props.pontuacao, 10))
            }
            
        })
    }

    render() {

        const btnStyle = { width: '40%', padding: '10px', margin: '10px' }
        let answerBox = <div>


            <Row>
                <Button style={{ margin: '5px' }} onClick={() => this.setState({ showAnswer: !this.state.showAnswer })} variant='success'>{this.state.showAnswer ? 'Esconder Explicação' : 'Mostrar Explicação'}</Button>
                <Button style={{ margin: '5px' }} onClick={() => {

                    this.setState(this.baseState)
                    for (let i = 1; i <= 4; i++)
                        document.getElementsByName(`${i}`)[0].style.boxShadow = ''
                }} variant='danger'>Tentar Novamente</Button>

            </Row>
        </div>
        return (
            <div className='container'>
                <div style={{ padding: '10px', backgroundColor: '#F8F8F8', borderRadius: '5px', }}>
                    {this.props.data.enunciado}
                </div>
                <div>
                    <Row>
                        <Button style={btnStyle} disabled={this.state.disableBtns} name='1' onClick={this.handleAnswer} variant='info'>{this.props.data.op1}</Button>
                        <Button variant='danger' disabled={this.state.disableBtns} style={{ width: '40%', padding: '10px', margin: '10px', backgroundColor: 'purple' }} name='2' onClick={this.handleAnswer} >{this.props.data.op2}</Button>
                    </Row>
                    <Row>
                        <Button style={btnStyle} disabled={this.state.disableBtns} name='3' onClick={this.handleAnswer} variant='success'>{this.props.data.op3}</Button>
                        <Button style={btnStyle} disabled={this.state.disableBtns} name='4' onClick={this.handleAnswer} variant='warning'>{this.props.data.op4}</Button>
                    </Row>
                    <h3>{this.state.feedback}</h3>
                    {this.state.showAnswerBox && answerBox}
                    {this.state.showAnswer && <p style={{ padding: '10px' }}>{this.props.data.explicacao}</p>}
                </div>
            </div>
        )
    }
}