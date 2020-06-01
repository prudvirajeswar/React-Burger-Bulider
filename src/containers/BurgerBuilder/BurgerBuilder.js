import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = 
    // }
    state = {
        purchasing: false,
        loading: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return (sum + el);
            }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        // --will get called after render() method
        //console.log('componentDidMount');
        console.log(this.props);
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         console.log('Error occured!')
        //     })
    }

    render() {
        //console.log('Render');
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burgerInfo = <Spinner />;

        if (this.props.ings != null) {
            burgerInfo = (
                <Aux>
                    <div>
                        <Burger ingredients={this.props.ings} />
                    </div>
                    <div>
                        <BuildControls
                            addIngredient={this.props.onIngredientAdded}
                            removeIngredient={this.props.onIngredientRemoved}
                            totalPrice={this.props.price}
                            disableItemRemoval={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler} />
                    </div>
                </Aux>
            );

            orderSummary = (
                < OrderSummary
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.price} />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                {burgerInfo}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
            </Aux >
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => { dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }) },
        onIngredientRemoved: (ingName) => { dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);