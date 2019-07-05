import React from 'react'
import ReactSVG from 'react-svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import './hover.css'
export default function Icon(props) {

    return (
        <div>
            <OverlayTrigger
                key='bottom'
                placement='bottom'
            
                overlay={
                    <Tooltip
                        id={props.url}
                    >{props.materia}</Tooltip>
                }
            >
                <ReactSVG src={props.url}
                    afterInjection={(error) => {
                        if (error) {
                            console.error(error)
                            return
                        }
                    }}
                    beforeInjection={svg => {

                        svg.setAttribute('style', 'height: 256px;width:256px;margin:30px;cursor:hand')

                    }}
                    evalScripts="always"
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>}
                    className = "box"
                    onClick={()=>{
                        alert(props.materia)
                    }}

                />

            </OverlayTrigger>
        </div>

    )


}