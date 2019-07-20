import React from 'react'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import PDFViewer from '../pdf/PDFViewer'
import PDFBackend from '../pdf/pdfjs'
import Button from 'react-bootstrap/Button';

class AulaDisplay extends React.Component {
   


    handleDownloadClick() {
        fetch(`/api/downloadzip?fileName=${this.props.element.caminhoArquivo}`)
            .then(res => {
                const fileName = this.props.element.caminhoArquivo
                res.blob().then(blob =>{
                    let url = window.URL.createObjectURL(blob)
                    let a = document.createElement('a')
                    a.href = url
                    a.download = fileName
                    a.click()
                })
            })
    }

    handleCompleteClick(){
        let data = {
            idUser:localStorage.getItem('id'),
            idAula:this.props.element.id
        }
        fetch(`/api/completeLect`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        }).then(res=>{
            if(res.ok){
                alert("Aula completada!")
            }
        })
    }

    render() {


        const style = {
            borderStyle: 'solid',
            borderWidth: '0.1px',
            borderRadius: '5px',
            backgroundColor: '#F8F8F8',
            padding: '20px'
        }
        let content;
        switch (this.props.element.tipo) {
            case "Texto":
                content = <p dangerouslySetInnerHTML={{ __html: this.props.element.conteudoTexto }}></p>
                break;
            case "Vídeo":
                content = <Player
                    playsInline
                    src={`http://localhost:4000/api/uploads/${this.props.element.caminhoArquivo}`}
                />
                break;
            case "Slide":
                content = <PDFViewer
                    backend={PDFBackend}
                    src={this.props.element.caminhoArquivo}
                />
                break;
            case "Executável":
                content =
                    <div>
                        <Button onClick={this.handleDownloadClick.bind(this)}>Baixar</Button>
                        <p>{this.props.element.caminhoArquivo}</p>
                    </div>
                break;
            default:
                content = ""
                break;


        }

        return (

            <div style={style}>
                <h1>{this.props.element.titulo}</h1>
                <h2>{this.props.element.assunto}</h2>
                {content}
                <Button onClick={this.handleCompleteClick.bind(this)}>Concluir aula</Button>
            </div>
        )
    }


}


export default AulaDisplay