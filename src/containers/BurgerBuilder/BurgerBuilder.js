import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


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
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
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

        if (this.props.ings) {
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => { dispatch(actions.addIngredient(ingName)) },
        onIngredientRemoved: (ingName) => { dispatch(actions.removeIngredient(ingName)) },
        onInitIngredients: () => { dispatch(actions.initIngredients()) },
        onInitPurchase: () => { dispatch(actions.purchaseBurgerInit()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);