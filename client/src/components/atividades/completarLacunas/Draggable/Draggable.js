import React from 'react'


export default class Draggable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    drag = (e) =>{
        e.dataTransfer.setData('text/plain', e.target.id)
    }

    noAllowDrop = (e)=>{
        e.stopPropagation()
    }

    render() {
        return (
            <div id={this.props.id} draggable='true' onDragStart={this.drag} onDragOver={this.noAllowDrop}>
                {this.props.children}
            </div>)
    }
}
