import React from 'react'

function Footer() {
    
    const style = {
        backgroundColor: "#212529",
        color:'white',
        textAlign: "center",
        padding: "20px",
        position: "relative",
        left: "0",
        bottom:'0',
        height: "60px",
        width: "100%",
        marginTop:"-60px",
        clear:"both",
        minTop:'100%'

    }

    return (
        <footer >
            <div/>
                <div style={style}>
                    <p>Desenvolvido por Daniel Sá Barretto Prado Garcia</p>
                </div>
            
        </footer>
    )

}

export default Footer