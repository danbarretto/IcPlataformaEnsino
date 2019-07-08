import React from 'react'
import Icon from './icons/Icon'
import Row from 'react-bootstrap/Row'
export default class MateriaPanel extends React.Component {

    render() {
        return (
            <div style={{paddingLeft:'25%', backgroundColor:'#F6F6F6', borderRadius:'10px'}}>
                <Row>
                    <Icon materia='Português'url='https://image.flaticon.com/icons/svg/1903/1903163.svg' />
                    <Icon materia='Matemática' url='https://image.flaticon.com/icons/svg/1050/1050470.svg' />
                    <Icon materia='Química' url='https://image.flaticon.com/icons/svg/1048/1048887.svg' />
                </Row>

                <Row>
                    <Icon materia='Biologia' url='https://image.flaticon.com/icons/svg/1837/1837897.svg' />
                    <Icon materia='Física' url='https://image.flaticon.com/icons/svg/199/199290.svg' />
                    <Icon materia='Filosofia' url='https://image.flaticon.com/icons/svg/1593/1593590.svg' />

                </Row>

                <Row>
                    <Icon materia='História' url='https://image.flaticon.com/icons/svg/589/589484.svg' />
                    <Icon materia='Geografia' url='https://image.flaticon.com/icons/svg/1300/1300102.svg' />
                    <Icon materia='Sociologia' url='https://image.flaticon.com/icons/svg/305/305126.svg' />

                </Row>


            </div>

        )
    }

}