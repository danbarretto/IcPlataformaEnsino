import React from 'react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
export default class MultiplaEscolha extends React.Component{


    render(){
        return(<div>

            <Row style={{padding:'15px'}}>
                <Button variant='info' style={{marginRight:'15px', width:'200px', height:'50px'}}>1</Button>
                <Button variant='danger' style={{marginLeft:'15px', width:'200px', height:'50px'}}>2</Button>
            </Row>
            <Row style={{ padding: '15px' }}>
                <Button variant='success' style={{marginRight:'15px', width:'200px', height:'50px'}}>3</Button>
                <Button variant='warning' style={{marginLeft:'15px', width:'200px', height:'50px'}}>4</Button>
            </Row>
        </div>)
    }
}