import React from 'react'
import {Player} from 'video-react'
import "./video-react.css";

function AulaDisplay(props){
        console.log(props.element)
        
        const style ={
            borderStyle:'solid',
            borderWidth:'0.1px',
            borderRadius:'5px',
            backgroundColor:'#F8F8F8',
            padding:'20px'
        }
        let content;
        switch(props.element.tipo){
            case "Texto":
                content = <a dangerouslySetInnerHTML={{ __html: props.element.conteudoTexto }}></a>
            break;
            case "Vídeo":
                content = <Player
                    playsInline
                    src={`http://localhost:4000/api/uploads/${props.element.caminhoArquivo}`}
                />
            break;
            

        }

        return(
            
            <div style={style}>
                <h1>{props.element.titulo}</h1>
                <h2>{props.element.assunto}</h2>
                {content}
            </div>
        )
    

}


export default AulaDisplay