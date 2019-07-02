import React from 'react'
import Table from 'react-bootstrap/Table'
import AulaElement from './AulaElement'
class AulaDisplay extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            elementArray:[]
        }

    }
    

    getLectures(){
        fetch(`http://localhost:5000/api/getLectures?id=${localStorage.getItem("id")}`, {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res =>{
            
            res.json().then(result =>{
                
                result.forEach(element => {
                    console.log(element)
                });
            })
        })
    }

    render(){
        this.getLectures();
        return (<Table>
            
        </Table>);
    }
}


export default AulaDisplay