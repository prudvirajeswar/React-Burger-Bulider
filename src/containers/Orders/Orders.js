import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     price: 0,
    //     loading: true
    // }

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        return (
            <div>
                {this.props.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);