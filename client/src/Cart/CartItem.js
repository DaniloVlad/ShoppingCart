import React from 'react';

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

export default CartItem;