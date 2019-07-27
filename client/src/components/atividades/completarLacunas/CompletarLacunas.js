import React from 'react'
import Row from 'react-bootstrap/Row'
import Droppable from './Droppable/Droppable';
import Draggable from './Draggable/Draggable'
class CompletarLacunas extends React.Component {


    shuffleBtns(array) {
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

    flatMap(array, fn) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            var mapping = fn(array[i])
            result = result.concat(mapping)
        }
        return result
    }


    render() {

        var result = this.props.data.texto
        result = this.flatMap(result.split(/<lacuna.*?<\/lacuna>\s?/g), (part) => {

            return [part,
                <Droppable id={part}>

                    <div style={{ color: 'white', margin: '5px', borderRadius: '5px', borderWidth: '3px', height: '50px', width: '150px', backgroundColor: '#888' }}></div>
                </Droppable>
            ]
        })
        result.pop()
        let btnVet = []
        let i = 0
        this.props.data.lacunas.forEach(element => {
            btnVet.push(
                <Draggable id={`texto${++i}`} >
                    <div className='btn btn-primary' style={{ margin: '5px' ,cursor: 'grab'}}>{element}</div>
                </Draggable>
            )

        });
        btnVet = this.shuffleBtns(btnVet)
        return (
            <div style={{ padding: '10px' }}>

                <Row >{result}</Row>
                

                    <Droppable id='initial'>
                        <Row>
                        {btnVet}
                        </Row>
                    </Droppable>
                
            </div>
        )
    }

    //style={{ padding: '15px', borderRadius: '5px', backgroundColor: '#E0E0E0', marginTop: 'px' }}
}

export default CompletarLacunas
