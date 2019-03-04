import React from 'react';

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cat: props.match.params.name,
            subTypes: []
        }
        this.getSubTypes = this.getSubTypes.bind(this);
    }

    getSubTypes() {
        let url = '/api/category/'+this.state.cat;
        console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(
            (response) => {
                if(response.err) console.log("Error loading categories!");
                else {
                    console.log(response)
                    this.setState({subTypes: response.results})}
            }
        )
    }
    componentDidMount() {
        this.getSubTypes();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id) 
            this.setState({cat: this.props.match.params.id, subTypes: []}, this.getSubTypes)
        
    }
    render() {
        const {subTypes} = this.state;
        if(subTypes === undefined || subTypes.length === 0)
            return (
                <div>
                    <h2>Show product types belonging to category: {this.state.cat}</h2>
                    <p>No products in this category :(</p>
                </div>

            )
        else
            return (
                <div>
                    <h2>Show product types belonging to category: {this.state.cat}</h2>
                    {
                       subTypes.map((value) => {
                            return value.name
                        })
                    }
                </div>
            )   
    }
}

export default Category;