import React from 'react';

var state_codes = {
    Alabama : "AL",
    Alaska : "AK",
    Arizona : "AZ",
    Arkansas : "AR",
    California : "CA",
    Colorado : "CO",
    Connecticut : "CT",
    Delaware : "DE",
    Florida : "FL",
    Georgia : "GA",
    Hawaii : "HI",
    Idaho : "ID",
    Illinois : "IL",
    Indiana : "IN",
    Iowa : "IA",
    Kansas : "KS",
    Kentucky : "KY",
    Louisiana : "LA",
    Maine : "ME",
    Maryland : "MD",
    Massachusetts : "MA",
    Michigan : "MI",
    Minnesota : "MN",
    Mississippi : "MS",
    Missouri : "MO",
    Montana : "MT",
    Nebraska : "NE",
    Nevada : "NV",
    NewHampshire : "NH",
    NewJersey : "NJ",
    NewMexico : "NM",
    NewYork : "NY",
    NorthCarolina : "NC",
    NorthDakota : "ND",
    Ohio : "OH",
    Oklahoma : "OK",
    Oregon : "OR",
    Pennsylvania : "PA",
    RhodeIsland : "RI",
    SouthCarolina : "SC",
    SouthDakota : "SD",
    Tennessee : "TN",
    Texas : "TX",
    Utah : "UT",
    Vermont : "VT",
    Virginia : "VA",
    Washington : "WA",
    WestVirginia : "WV",
    Wisconsin : "WI",
    Wyoming : "WY"
}

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cart: []}
        this.checkout = this.checkout.bind(this);
    }

    componentDidMount() {
        fetch('/api/cart/checkout', {credentials: 'include', method: 'GET', headers: {'accept': 'application/json'}})
        .then(res => res.json())
        .then(resp => this.setState(resp))
    }

    checkout(event) {
        event.preventDefault();
        
        var postData = {
            first_name: event.target.elements.first_name.value, 
            last_name: event.target.elements.last_name.value, 
            email: event.target.elements.email.value, 
            address_1 : event.target.elements.address_1.value, 
            address_2: event.target.elements.address_2.value, 
            city: event.target.elements.city.value, 
            state: event.target.elements.state.value, 
            zip: event.target.elements.zip.value
        }

        var settings = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }

        fetch('/api/cart/checkout', settings)
        .then(res => res.json())
        .then((response) => {
            if(response.suc) 
             window.location.href = response.suc;
            console.log(response);
        });
        
        
    }

    render() {
        return (
            <div>
                {
                    (this.state.cart === undefined || this.state.cart.length === 0) ? <p>Cart is empty</p>
                    :
                    this.state.cart.map((value, index) => {
                        return (
                                
                                <p key={index}>{value.product_name +" "+value.product_variant}</p>
                            ) 
                    })
                }
                <h2>Checkout Form: </h2>
                <form onSubmit={this.checkout} className='checkout-form'>
                    <div className='form-item'>
                        <label>Email: </label>
                        <input type="email" name="email" placeholder="email"/>
                    </div>

                    <div className="form-group">
                        <div className='form-item'>
                            <label>First Name: </label>
                            <input type="text" name="first_name" placeholder="First Name"/>
                        </div>

                        <div className='form-item'>
                            <label>Last Name: </label>
                            <input type="text" name="last_name" placeholder="Last Name"/>
                        </div>
                    </div>
                    

                    <div className='form-item'>
                        <label>Address 1: (ie 123 Main rd): </label>
                        <input type="text" name="address_1" placeholder="Address 1"/>
                    </div>

                    <div className='form-item'>
                        <label>Address 2: (ie apartment or suit number): </label>
                        <input type="text" name="address_2" placeholder="Address 2"/>
                    </div>

                    <div className='form-item'>
                        <label>City/Town/Village: </label>
                        <input type="text" name="city" placeholder="City/Town/Village"/>
                    </div>
                    
                    <div className='form-item'>
                        <label>ZIP code: </label>
                        <input type="text" name="zip" placeholder="ZIP code"/>
                    </div>
                    
                    
                    <div>
                        <select name="state">
                            {
                                Object.keys(state_codes).map((value, index) => {
                                    return <option key={index} value={state_codes[value]} >{value}</option>
                                })
                            }
                        </select>
                    </div>
                        
                    <div className='form-item'>
                        <button>Post form</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Checkout;