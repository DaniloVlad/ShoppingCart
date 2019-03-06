import React from "react";
import { Link } from "react-router-dom";
import MenuItems from './Menu/MenuItems';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menu_items: [], cart: []}
    }

    componentDidMount() {
        console.log(this.state)
    }
    componentDidUpdate(prevProps) {
        if(this.props.cart !== prevProps.cart)
            this.setState({ menu_items: this.props.menu_items, cart: this.props.cart });  
    }

    render() {
        const {menu_items, cart} = this.state;
        if(menu_items === undefined || menu_items.length === 0 || cart === undefined ) 
            return (<h1>No menu...</h1>)
        else 
            return (
            
                    <div className="nav">  
                        
                            <div className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </div>
                            <MenuItems menu_items={this.state.menu_items} />

                            <div className="nav-item submenu">
                                <Link className="nav-link" to="/cart/view">Cart: {cart.length}</Link>
                                <div className="dropdown">
                                    {
                                    cart === undefined || cart.length === 0 ? <div></div> : JSON.stringify(cart)
                                    }
                                </div>
                            </div>
                        
                        
                    </div>
            );
    }
}


export default Menu;
