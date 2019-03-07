import React from 'react';
import ProductCard from './ProductCard';



class Types extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variants : [],
            type_name: props.match.params.type
        }
        this.getVariants = this.getVariants.bind(this);
    }

    getVariants() {
        console.log("Getting variants for: " + this.state.type_name)
        let url = '/api/products/'+this.state.type_name
        fetch(url, {method: 'GET', credentials: 'include', headers: {
            'accept': 'application/json'
        }})
        .then(res => res.json())
        .then((response) => {
                console.log(response)
                this.setState({variants: response.products});
        });
    }
    componentDidMount() {
        this.getVariants();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.type !== prevProps.match.params.type) {
            this.setState({type_name: this.props.match.params.type}, this.getVariants);
            

        }
    }
    render() {
        let {variants} = this.state;
        if(variants === undefined || variants.length === 0) {
            return (
                <div>
                <h2>Here we show a products of specific type: {this.props.match.params.type}</h2>
                <p>No variants :(</p>
            </div> 
            )
        }
        else {
            return (
                <div>
                    {/* <h2>Here we show a products of specific type: {this.state.type_name}</h2> */}
                    <div className="product-grid">
                        {
                        this.state.variants.map((value, index) => {
                            return (
                                    <ProductCard key={index} updateCart={this.props.updateCart} details={value}/>
                                );
                                
                        })
                        }
                    </div>
                </div>
    
            );

        }
    }
}

export default Types;