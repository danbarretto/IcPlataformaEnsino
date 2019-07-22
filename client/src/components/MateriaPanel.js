import React from 'react'
import Icon from './icons/Icon'
import Row from 'react-bootstrap/Row'
export default class MateriaPanel extends React.Component {

    handleClick = (mat) => {
        this.props.changeMateria(mat)
    }

    render() {
        return (
            <div style={{paddingLeft:'25%', paddingRight:'34%'}}>

                <div style={{backgroundColor: '#F6F6F6', borderRadius: '10px' }}>
                    <Row>
                        <Icon changeMateria={this.props.changeMateria} materia='Português' url='https://image.flaticon.com/icons/svg/1903/1903163.svg' />
                        <Icon changeMateria={this.props.changeMateria} materia='Matemática' url='https://image.flaticon.com/icons/svg/1050/1050470.svg' />
                        <Icon changeMateria={this.props.changeMateria} materia='Química' url='https://image.flaticon.com/icons/svg/1048/1048887.svg' />
                    </Row>

                    <Row>
                        <Icon changeMateria={this.props.changeMateria} materia='Biologia' url='https://image.flaticon.com/icons/svg/1837/1837897.svg' />
                        <Icon changeMateria={this.props.changeMateria} materia='Física' url='https://image.flaticon.com/icons/svg/199/199290.svg' />
                        <Icon changeMateria={this.props.changeMateria} materia='Filosofia' url='https://image.flaticon.com/icons/svg/1593/1593590.svg' />

                    </Row>

                    <Row>
                        <Icon changeMateria={this.props.changeMateria} materia='História' url='https://image.flaticon.com/icons/svg/589/589484.svg' />
                        <Icon changeMateria={this.props.changeMateria} materia='Geografia' url='https://image.flaticon.com/icons/svg/1300/1300102.svg' />
                        <Icon changeMateria={this.props.changeMateria} materia='Sociologia' url='https://image.flaticon.com/icons/svg/305/305126.svg' />

                    </Row>

                </div>

            </div>

        )
    }

}