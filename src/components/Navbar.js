import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render(){
        return(
            <>
            {this.props.user === 'null' && 
                (<div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand"  to="/">Block-Cart</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/buyer">Buyer</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/seller">Seller</Link>
                                </li>
                                </ul>
                            </div>                        
                    </nav>
                </div>)
            }   

            {this.props.user === 'seller' && 
                (<div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand"  to="/seller">Block-Cart</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/seller/selldetails">
                                        Sell details
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/"><button className='btn' onClick={()=>this.props.updateUser('null')}>Log Out</button></Link>
                                </li>
                                </ul>
                            </div>                  
                    </nav>
                </div>)
            }  

            {this.props.user === 'buyer' && 
                (<div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand"  to="/buyer">Block-Cart</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/buyer/orders">Your Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/"><button className="btn" onClick={()=>this.props.updateUser('null')}>Log Out</button></Link>
                                </li>
                                </ul>
                            </div>                      
                    </nav>
                </div>)
            }  
            </>
        );
    }
}

export default Navbar;