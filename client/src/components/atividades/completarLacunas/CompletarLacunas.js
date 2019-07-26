import React from 'react'
import Button from 'react-bootstrap/Button'

class CompletarLacunas extends React.Component {

    shuffleBtns(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    flatMap(array, fn){
        var result =[]
        for(var i=0; i<array.length; i++){
            var mapping = fn(array[i])
            result = result.concat(mapping)
        }
        return result
    }
    
    render() {

        var result = this.props.data.texto
        
        result = this.flatMap(result.split(/<lacuna.*?<\/lacuna>\s?/g), (part)=>{
            return [part, <input style={{borderRadius:'5px'}}></input>]
        })
        result.pop()
        let btnVet =[]
        this.props.data.lacunas.forEach(element => {
            btnVet.push(<Button draggable='true' style={{margin:'5px'}}>{element}</Button>)
        });
        btnVet = this.shuffleBtns(btnVet)
        return (
            <div style={{ padding: '10px' }}>

                <div>{result}</div>

                <div style={{padding:'15px', borderRadius:'5px', backgroundColor:'#E0E0E0', marginTop:'px'}}>
                    {btnVet}
                </div>
            </div>
        )
    }
}

export default CompletarLacunas
