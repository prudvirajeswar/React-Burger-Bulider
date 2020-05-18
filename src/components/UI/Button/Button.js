import React from 'react';
import './Button.css';

const button = (props) => {
    const buttonType = "Button" + ' ' + props.btnType;
    return (
        <button className={buttonType} onClick={props.clicked}>
            {props.children}
        </button>
    );
}


export default button;