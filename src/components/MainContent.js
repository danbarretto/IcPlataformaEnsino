import React, {Component} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'


class MainContent extends Component{

    render(){
        return(<div>
            <Jumbotron>
                <h1>Bem vindo!</h1>
                <p>Essa é a mais nova plataforma de ensino aberta!</p>
                <Button variant="primary">Continuar</Button>
            </Jumbotron>

        </div>)
    } 

}

export default MainContent