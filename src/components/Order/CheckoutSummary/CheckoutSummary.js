import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Success" clicked={props.checkoutContinued}>
                CONTINUE
            </Button>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>
                CANCEL
            </Button>
        </div>

    );
}

export default checkoutSummary;