import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2
}

const INGREDIENT_PRICES = {
    bacon: 0.5,
    cheese: 0.75,
    meat: 1.5,
    salad: 0.25
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        }
        case (actionTypes.REMOVE_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        }
        case (actionTypes.SET_INGREDIENTS): {
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    meat: action.ingredients.meat,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese
                },
                totalPrice: 2
            }
        }
        default: {
            return state;
        }
    }
    return state;
}

export default reducer;