import React from 'react';
import AddToCart from './AddToCart';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id, 
            name: "", 
            type: "", 
            description: "",
            price: 0, 
            product_variants: [], 
            err: "",
            selected : {price: 0, variant: 0, quantity: 1}
        };
        
        this.getProductDetails = this.getProductDetails.bind(this);
        this.updateListedPrice = this.updateListedPrice.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    getProductDetails() {
        const url = '/api/product/'+this.state.id
        fetch(url)
        .then(res => res.json())
        .then((response) => {
            // console.log(this.state)
            if(response.err !== undefined || response.err === "") this.setState(response)
            else {
                let {result} = response;
                result.variants = JSON.parse(result.variants);
                this.setState({
                    id: result.id, 
                    name: result.name, 
                    description: result.description,
                    type: result.type, 
                    type_name: result.type_name,
                    price: result.price, 
                    product_variants: result.variants, 
                    err: "",
                    selected: {price: result.price, variant: 0,  quantity:1}
                }, ()=> console.log(this.state));
            }
        })
    }

    updateQuantity(event) {
        var dummyState = this.state;
        dummyState.selected.quantity = parseInt(event.target.value);
        this.setState(dummyState)
    }
    
    updateListedPrice(event) {
        event.preventDefault();
        let {name, price} = this.state.product_variants[event.target.value];
        let newState = this.state;
        this.newState.selected.price = price;
        this.newState.selected.name = name;
        this.setState(newState, () => console.log(this.state));
    }
    
    componentDidMount() {
        this.getProductDetails();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id)
            this.setState({id: this.props.match.params.id}, this.getProductDetails);
    }
    
    render() {
        let {id, name, description, type, type_name, err, product_variants} = this.state;
        let { price, quantity, variant} = this.state.selected;
        if(err) 
            return(
                <h2>{err}</h2>
            )
        else {
            let product = {
                product_id: id,
                product_name: name,
                product_description: description,
                product_variant: variant,
                product_type: type,
                quantity: quantity
            };
            return (
                <div>
                    <h2>Product: {name} </h2>
                    <p>Type: {type_name}</p>
                    <p>Price: ${price.toFixed(2)}</p>
                    <input onChange={this.updateQuantity} name="quantity" defaultValue="1" type="number" max="5" min="1" step="1" />
                    <p>Description: {description}</p>
                    <select onChange={this.updateListedPrice}>
                        <option value={0}>{type_name}</option>
                        {product_variants === undefined || product_variants.length === 0 ? 
                            <div></div>
                        :
                            product_variants.map((key, index) => {
                                return <option key={index} value={index}>{key.name}</option>
                            })
                        }
                    </select>
                    <AddToCart product={product} updateCart={this.props.updateCart}>Add to Cart</AddToCart>
                </div>
            );
        }
    }
}

export default Product;