import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div className="card text-center home-card">
                <div className="card-body">
                    <h5 className="card-title">LogIn</h5>
                    
                    <Link to="/buyer"><button className="btn btn-primary">Buyer</button></Link>
                    <Link to="/seller"><button className="btn btn-primary">Seller</button></Link>
                </div>
            </div>
        );
    }
}

export default Home;