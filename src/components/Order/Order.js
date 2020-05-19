import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            price: props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map(ing => {
        return (
            <span key={ing.name}
                  style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}>
                {ing.name} ({ing.price})
            </span>
        );
    })

    return (
        <div className="Order">
            <p>Ingredients: {ingredientOutput}</p>
            <p><strong>Price: USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;