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
            product_variant: default_variant,
            product_type: type,
            quantity: 1
        };

        return (
            <div className='card'>
                <img className="card-image" src={"https://via.placeholder.com/300x150.png?text="+name} />
                <h3 class="card-title">
                    {name+": "} <small>{default_variant}</small>
                </h3>
                <div class="card-body">
                    <p>
                        {description.substring(0, 128)+'...'}
                    </p>
                    <hr class="price-break"/>
                    <p class="price">
                        Price: ${price.toFixed(2)}
                    </p>
                    <div class="btn-group">
                        <Link to={'/product/'+id}><button class="btn view">View</button></Link>
                        <AddToCart product = {product} updateCart={this.props.updateCart}>Quick Add</AddToCart>
                    </div>
                </div>              
            </div>
        )
    }
}

export default ProductCard;