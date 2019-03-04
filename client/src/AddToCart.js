import React from 'react';

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.product;
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        // console.log("ADD TO CART")
        console.log(this.state)
        fetch('/api/cart/add', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include'
            
        })
        .then(res => res.json())
        .then((response) => {
            // console.log(response)
            if(response.suc)
                this.props.updateCart();
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.product !== prevProps.product) this.setState(this.props.product)
    }
    render() {
        return <button onClick={this.addToCart}>{this.props.children}</button>
    }
}

export default AddToCart;