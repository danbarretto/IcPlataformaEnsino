import React from 'react'
import Form from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
const reactStringReplace = require('react-string-replace')

export default class CompletarLacunas extends React.Component {


    render() {

        var text = this.props.data.texto.replace(/\<lacuna.*?\<\/lacuna>\s?/g, '<input ></input> ')
        let btnVet =[]
        this.props.data.lacunas.forEach(element => {
            btnVet.push(<Button style={{margin:'5px'}}>{element}</Button>)
        });
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