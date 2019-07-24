import React from 'react'
import ReactSVG from 'react-svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import './hover.css'
export default class Icon extends React.Component {


    constructor(props){
        super(props)
        this.state={
            style:{
                backgroundColor:'grey'
            }
        }
    }

    render() {

        return (
            <div>
                <OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    style={this.state.style}
                    overlay={
                        <Tooltip
                            id={this.props.url}
                        >{this.props.materia}</Tooltip>
                    }
                >
                    <ReactSVG src={this.props.url}
                        afterInjection={(error) => {
                            if (error) {
                                console.error(error)
                                return
                            }
                        }}
                        beforeInjection={svg => {

                            svg.setAttribute('style', 'height: 200px;width:200px;margin:20px;cursor:hand')

                        }}
                        evalScripts="always"
                        fallback={() => <span>Error!</span>}
                        loading={() => <span>Loading</span>}
                        className="box"
                        onClick={() => {
                            this.props.changeMateria(this.props.materia)
                            this.setState({style:{
                                backgroundColor:'blue'
                            }})
                        }}

                    />

                </OverlayTrigger>
            </div>

        )
    }


}