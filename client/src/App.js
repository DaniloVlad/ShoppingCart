import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Product from './Product';
import Types from './Types';
import Category from './Category';
import Cart from './Cart';
import Checkout from './Checkout';
import Order from './Order';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: [],
            settings: {
                name: "",
                support_email: ""
            },
            cart: []
        }
        this.updateCart = this.updateCart.bind(this);
    }
       
    updateCart() {
        fetch('/api/', {method: 'GET', credentials: 'include', headers: {
            'accept' : 'application/json'
        }})
        .then(res => res.json())
        .then((response) => {
            let newState = response;
            var x = 0;
            for(x in newState.menu)
                newState.menu[x].subCategories = JSON.parse(newState.menu[x].subCategories)
            console.log(newState);
            this.setState(newState, () => console.log(this.state))
        })
    }
    
    componentDidMount() {
        // console.log(this.props)
        fetch('/api/', {method: 'GET', credentials: 'include', headers: {
            'accept':'application/json'
        }})
        .then(res => res.json())
        .then((response) => {
            let newState = response;
            var x = 0;
            for(x in newState.menu)
                newState.menu[x].subCategories = JSON.parse(newState.menu[x].subCategories);
            
            this.setState(newState, this.updateCart)
           
        });
    }
    render() {
        const {settings, menu, cart} = this.state;
        return (
            <div className="container">             
                <h1 className="header">{settings.name}</h1>
                <Router>
                    <div>

                        <Switch>
                            <Route path="/dashboard" render={() => <h2>DASH</h2>}/>
                            <Route path="/" render={(props) =>  <Menu {...props} updateCart={this.updateCart} cart={cart} menu_items={menu}/> } />
                        </Switch>
                        <Switch>
                            <Route path="/product/:id(\d+)" render={(props) => <Product {...props} updateCart={this.updateCart} />} />
                            <Route path="/products/:type" render={(props) => <Types {...props} updateCart={this.updateCart} />} />
                            <Route path="/categories/:name" component={Category} />
                            <Route exact path="/cart/view" render={(props) => <Cart {...props} updateCart={this.updateCart} />} />
                            <Route exact path="/cart/checkout" component={Checkout}/>

                        </Switch>
                        <Route path="/order/view" component={Order}/>

                    </div>
               </Router>
            </div>
            
        )
    }
}

export default App;