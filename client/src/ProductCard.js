import React from 'react';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';

class ProductCard extends React.Component {
     
    render() {
        let { id, name, description, type, price, default_variant } = this.props.details;
        let product = {
            product_id: id,
            product_name: name,
            product_description: description,
            product_variant: 0,
            product_type: type,
            quantity: 1
        };

        return (
            <div className='product-card'>
                <h2>{name+": "} <small>{default_variant}</small></h2>
                <p>Price: ${price.toFixed(2)}</p>
                <p>Description: {description.substring(0, 34)+'...'}</p>
                <AddToCart product = {product} updateCart={this.props.updateCart}>Quick Add</AddToCart>
                <Link to={'/product/'+id}><button>View</button></Link>
            </div>
        )
    }
}

export default ProductCard;