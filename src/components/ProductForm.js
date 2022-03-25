import '../App.css';
import React, {Component} from 'react';

class ProductForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            price:0,
            stock:0
        }
    }

    render(){
        return(
            <form className="form form-inline" 
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.add(this.state.name,this.state.price,this.state.stock)
                }}>
                <div className="form-group mx-sm-3 mb-2">
                    <input
                        type="text"
                        onChange={(event) => {
                            const userName = this.ninput.value.toString()
                            this.setState({
                                name: userName
                            })
                        }}
                        ref={(input) => { this.ninput = input }}
                        className="form-control form-control-lg"
                        placeholder="Product name"
                        required/>
                     <input
                        type="text"
                        onChange={(event) => {
                            const userName = this.pinput.value.toString()
                            this.setState({
                                price: userName
                            })
                        }}
                        ref={(input) => { this.pinput = input }}
                        className="form-control form-control-lg"
                        placeholder="Price"
                        required/>
                     <input
                        type="text"
                        onChange={(event) => {
                            const userName = this.sinput.value.toString()
                            this.setState({
                                stock: userName
                            })
                        }}
                        ref={(input) => { this.sinput = input }}
                        className="form-control form-control-lg"
                        placeholder="stock"
                        required/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
        )
    }
}

export default ProductForm