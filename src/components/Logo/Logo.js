import React from 'react';
import BurgerLogo from '../../assets/burger-logo.png';
import './Logo.css';

const logo = (props) => (
    <img
        className="Logo"
        src={BurgerLogo}
        alt="MyBurger"
        style={{ height : props.height, marginBottom : props.marginbottom}}>
    </img>
);

export default logo;