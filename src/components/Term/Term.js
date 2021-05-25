import React from 'react';
import './Term.css';
import keanuReeves from '../../images/Keanu_Reeves.gif';

function Term() {
    return (
        <>
            <div className="kr-container">
                <img src={keanuReeves} alt="" className="kr"></img>
                <p className="quote">認真你就輸了</p>
            </div>
        </>
    )
}

export default Term;