import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
export default class MultiplaEscolha extends React.Component{


    render(){
        const btnStyle1 ={width:'auto', minWidth:'300px', padding:'10px', marginRight:'15px'}
        const btnStyle2 = { width: 'auto', minWidth: '300px', padding:'10px'}
        return(
            <div style={{paddingLeft:'10px'}}>
                <div style={{backgroundColor:'#F8F8F8', borderRadius:'5px'}}>
                    {this.props.enunciado}
                </div>
                <Row style={{marginBottom:'5px'}}>
                    <Button style={btnStyle1} variant='info'>{this.props.op1}</Button>
                    <Button style={btnStyle2} variant='danger'>{this.props.op2}</Button>
                </Row>
                <Row>
                    <Button style={btnStyle1} variant='success'>{this.props.op3}</Button>
                    <Button style={btnStyle2} variant='warning'>{this.props.op2}</Button>
                </Row>
            </div>
        )
    }
}