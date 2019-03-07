import React from 'react';
import AddToCart from './AddToCart';
import './Product.css'
//ISOLATED DESIGN: https://jsfiddle.net/crw1u6xs/126/
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id, 
            name: "", 
            type: "", 
            description: "",
            default_variant: "",
            price: 0, 
            product_variants: [], 
            err: "",
            selected : {price: 0, variant: "", quantity: 1}
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
                    default_variant: result.default_variant,
                    type_name: result.type_name,
                    price: result.price, 
                    product_variants: result.variants, 
                    err: "",
                    selected: {price: result.price, variant: result.default_variant,  quantity:1}
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
        var sel = event.target.value;
        var newState = this.state;
        if(sel === this.state.default_variant) {
            newState.selected.variant = this.state.default_variant;
            newState.selected.price = this.state.price;
        }
        else {
            let {name, price} = this.state.product_variants[sel];
            newState.selected.variant = name;
            newState.selected.price = price;
        }
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
        let {id, name, description, default_variant,type, type_name, err, product_variants} = this.state;
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
                <div className="product-view">
                    <img className="product-img" src="https://via.placeholder.com/450x225.png?text=Product 1" alt="" />
                    <div className="product-info">
                        <h3 className="product-title">
                            { name + " - " + type_name + " - " + variant } 
                        </h3>
                        
                        <div className="product-body">
                            <p className="product-desc">
                                { description }  
                            </p>
                            <div className="form-group">
                                <div className="form-item">
                                    <p className="product-price">Price: <span class="price-tag">{"$ " + price}</span></p>
                                </div>
                                <div className="form-item">
                                    <label for="variants">Length: </label>
                                    <select className="variants" onChange={this.updateListedPrice}>
                                        <option value={default_variant}>{default_variant}</option>
                                        { product_variants === undefined || product_variants.length === 0 ? 
                                            ""
                                        :
                                            product_variants.map((key, index) => {
                                                return <option key={index} value={index}>{key.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-item">
                                    <label for="variants">Quantity: </label>
                                    <input className="range" onChange={this.updateQuantity} name="quantity" defaultValue="1" type="number" max="5" min="1" step="1" />
                                </div>
                                <div className="form-item">
                                    <AddToCart className="btn-block" product={product} updateCart={this.props.updateCart}>Add to Cart</AddToCart>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            );
        }
    }
}

export default Product;
