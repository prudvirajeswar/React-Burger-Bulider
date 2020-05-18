import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/ReactAux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <div className="Modal" style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100)vh',
            display: props.show ? 'inline' : 'none'
        }}>
            {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    </Aux>
);

export default modal;