import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

function AulaDisplay(props){
        console.log(props.element)
        return(
            
            <div>
                <h1>{props.element.titulo}</h1>
                <h2>{props.element.assunto}</h2>
                <a dangerouslySetInnerHTML={{__html:props.element.conteudoTexto}}></a>
            </div>
        )
    

}


export default AulaDisplay