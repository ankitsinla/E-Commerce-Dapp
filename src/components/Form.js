import '../App.css';
import React, {Component} from 'react';

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:''
        }
    }

    render(){
        return(
            <form className="form form-inline" 
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.add(this.state.name)
                }}>
                    <div className="card text-center home-card">
                        <div className="card-body">
                            <h5 className="card-title">New {this.props.user}</h5>
                            <div className="form-group mx-sm-3 mb-2">
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        const userName = this.input.value.toString()
                                        this.setState({
                                            name: userName
                                        })
                                    }}
                                    ref={(input) => { this.input = input }}
                                    className="form-control form-control-lg"
                                    placeholder="Enter name"/>
                                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                            </div>
                        </div>
                    </div>
               
                
            </form>
        )
    }
}

export default Form