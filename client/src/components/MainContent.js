import React, {Component} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'

class MainContent extends Component{

    render(){
        var centerImg = {    
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'
        
        }
        
        return(<div>
            <Carousel>
                <Carousel.Item>
                    <img style={centerImg}
                    className="d-block w-100"
                        src="https://s-i.huffpost.com/gen/1579454/images/o-SCHOOL-KIDS-facebook.jpg"
                    alt="First slide"
                />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={centerImg}
                        className="d-block w-100"
                        src="https://www.ensinonacional.com.br/img/2017/11/2-cursos-a-cada-2-meses-cresca-com-a-ensino-nacional-20171019132746.jpg.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={centerImg}
                        className="d-block w-100"
                        src="https://www.enfoquems.com.br/media/images/214/49366/5be353f3d5499851a46133ebbbf070e08e9f6fb67f660.jpg  "
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Jumbotron style={{height:"300px"}}>
                <h1>Bem vindo!</h1>
                <p>Essa é a mais nova plataforma de ensino aberta!</p>
                
                <Button variant="primary">Continuar</Button>
            </Jumbotron>

        </div>)
    } 

}

export default MainContent