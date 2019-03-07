import React from 'react';
import {Link } from 'react-router-dom';


class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.details;

        this.updateQunatity = this.updateQunatity.bind(this);
    }

    updateQunatity() {
        //post remove from cart
    }
    
    render() {
        var {product_name, product_id, product_description, product_variant, product_type, quantity, price} = this.state;
        return (
            <div>
                <h4>{product_name}: {product_variant}</h4>
                <p>Description: <i>{product_description}</i></p>
                <p>Type: {product_type}</p>
                <input name="quantity" defaultValue={quantity} type="number" max="5" min="1" step="1" />
                <p>Cost: <b>{price}</b></p>
                <hr />
            </div>
            
            )

    }
}

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
            return(
                <div>
                    {
                    this.state.token === undefined || this.state.payerID === undefined || this.state.token.length === 0 || this.state.payerID.length === 0 ?
                        <div></div>
                    :
                        <div>Successfully created order! {this.state.token}</div>
                }
                    <h2>View Cart: </h2>
                    <hr />
                    <p>You\'re cart is empty!</p>
                </div>
            );
        return(
            <div>
                {
                    this.state.token === undefined || this.state.payerID === undefined || this.state.token.length === 0 || this.state.payerID.length === 0 ?
                        <div></div>
                    :
                        <div>Successfully created order!</div>
                }
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