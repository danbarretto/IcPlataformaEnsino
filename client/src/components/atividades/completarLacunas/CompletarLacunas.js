import React from 'react'
import Button from 'react-bootstrap/Button';

export default class CompletarLacunas extends React.Component {

    shuffleBtns(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    
    render() {

        var text = this.props.data.texto.replace(/<lacuna.*?<\/lacuna>\s?/g, '<input ondragstart="drag(event)" ondrop=\'drop(event)\'></input> ')
        let btnVet =[]
        this.props.data.lacunas.forEach(element => {
            btnVet.push(<Button draggable='true' style={{margin:'5px'}}>{element}</Button>)
        });
        btnVet = this.shuffleBtns(btnVet)
        return (
            <div style={{ padding: '10px' }}>

                <a dangerouslySetInnerHTML={{ __html: text }}></a>

                <div style={{padding:'15px', borderRadius:'5px', backgroundColor:'#E0E0E0', marginTop:'px'}}>
                    {btnVet}
                </div>
            </div>
        )
    }
}