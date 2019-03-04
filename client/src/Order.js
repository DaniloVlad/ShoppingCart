import React from 'react';
import queryString from 'query-string';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token : "",
            payerID: "",
            err: ""
        };
        this.captureOrder = this.captureOrder.bind(this);
    }

    captureOrder() {   
        var postData = this.state;
        var settings = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        fetch('/api/dashboard/order', settings)
        .then(res => res.json())
        .then(resp => this.setState(resp));
    }

    componentDidUpdate(prevProps) {
        let params = queryString.parse(this.props.location.search);
        let prevParams = queryString.parse(prevProps.location.search);

        if(params.payerID !== prevParams.payerID || params.token !== prevParams.token) 
            return this.setState({token: params.token, payerID: params.PayerID});
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        let nState = {payerID: params.PayerID, token: params.token}
        
        this.setState(nState, this.captureOrder);
    }

    render() {
        let {token, payerID, err} = this.state;
        if(token === undefined || payerID === undefined || token.length === 0 || payerID.length === 0)
            return (
                <div>
                    <h2>Order</h2>
                    <p>{err}</p>
                    <p>Token or payer does not exist!</p>
                </div>
            );
        else
            return (
                <div>
                    <h2>Order!</h2>
                    <p>{err}</p>
                    <p>{token}</p>
                    <p>{payerID}</p>
                </div>

            );
    }
}

export default Order;