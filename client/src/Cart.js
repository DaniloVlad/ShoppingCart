import React from 'react';
import {Link } from 'react-router-dom';
import CartItem from './Cart/CartItem';
import EmptyCart from './Cart/EmptyCart';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cart: [], itemCost: 0, shippingCost: 0}
        this.clearCart = this.clearCart.bind(this);
    }

    clearCart() {
        var settings = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include'
        }

        fetch('/api/cart/clear', settings)
        .then(res => res.json())
        .then(resp => this.setState({cart: []}, this.props.updateCart))
    }

    componentDidMount() {
       // console.log('getting cart')
       fetch('/api/cart/view', {method: 'GET', credentials: 'include'})
       .then(res => res.json())
       .then((response) => {
           if(response.err) {
               console.log('Couldn\'t get cart!')
               this.setState(response)
               return ;
           }
           else {
               this.setState(response)
           }
       })
    }

    render() {
        if(this.state.cart === undefined || this.state.cart.length === 0 || this.state.err !== undefined)
            return <EmptyCart />
        else 
            return(
                <div>
                    <h2>View Cart: </h2>
                    <hr />
                    {
                        this.state.cart.map((value, index) => <CartItem key={index} details={value} />)
                    }
                    <hr />
                    <p>Sub Total: {this.state.itemCost.toFixed(2)} </p>
                    <p>Shipping Cost: {this.state.shippingCost.toFixed(2)} </p>
                    <hr />
                    <p>Total: { (this.state.itemCost + this.state.shippingCost).toFixed(2) }</p>
                    <Link to='/cart/checkout'><button>Checkout</button></Link>
                    <button onClick={this.clearCart}>Clear Cart</button>
                </div>
            )
        
    }
}




export default Cart;