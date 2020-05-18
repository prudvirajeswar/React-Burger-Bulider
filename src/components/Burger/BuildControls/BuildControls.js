import React from 'react';
import './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const ingredients = [
    { type: 'meat', label: 'Meat' },
    { type: 'bacon', label: 'Bacon' },
    { type: 'salad', label: 'Salad' },
    { type: 'cheese', label: 'Cheese' }
];

const buildControls = (props) => (
    <div className="BuildControls">
        <p>Total Price : $<strong>{props.totalPrice.toFixed(2)}</strong></p>
        {ingredients.map(ingr => {
            return <BuildControl
                key={ingr.label}
                label={ingr.label}
                add={() => props.addIngredient(ingr.type)}
                remove={() => props.removeIngredient(ingr.type)}
                canDisable={props.disableItemRemoval[ingr.type]} />
        })
        }
        <button
            className="OrderButton"
            disabled={!props.purchasable}
            onClick={props.ordered} > ORDER NOW
        </button>
    </div>
);

export default buildControls;
