import React from 'react'

function Footer() {

    const style = {
        backgroundColor: "#212529",
        textAlign: "center",
        color: "white",
        bottom:'0%'

    }

    return (
        <footer className="navbar-fixed-bottom" style={style}>
            <div className="container">
                <div>
                    <h2>This is the footer</h2>
                    <p>Desenvolvido por Daniel Sá Barretto Prado Garcia</p>
                    <p>danielbarretto@usp.br</p>
                </div>
            </div>
        </footer>
    )

}

export default Footer