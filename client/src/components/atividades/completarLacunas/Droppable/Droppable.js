import React from 'react'


export default class Droppable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    drop = (e) =>{
        e.preventDefault()
        const data = e.dataTransfer.getData('text/plain')        
        e.target.appendChild(document.getElementById(data))
        
    }

    allowDrop = (e)=>{
        e.preventDefault()

    }

    render() {
        return (
        <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop}>
            {this.props.children}
        </div>)
    }
}
