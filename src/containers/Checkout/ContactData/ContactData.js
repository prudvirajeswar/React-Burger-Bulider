import React, { Component } from 'react';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pinCode: '',
            city: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Prudvi',
                email: 'prudvi.test@gmail.com',
                address: {
                    street: 'Test Street',
                    zipCode: '517152',
                    city: 'Los Angeles'
                }
            },
            deliveryMode: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/orders');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form =
            (<form>
                <input className="Input" type="text" name="name" placeholder="Your Name" />
                <input className="Input" type="text" name="email" placeholder="Your Email" />
                <input className="Input" type="text" name="street" placeholder="Your Street" />
                <input className="Input" type="text" name="pinCode" placeholder="Postal Code" />
            </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className="ContactData">
                <h3>Please enter your Contact Data</h3>
                {form}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </div>
        );
    }
}

export default ContactData;