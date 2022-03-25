import React , {Component} from "react";
import '../App.css';

class BuyerOrder extends Component {
    render(){
        return(
            <>
                <div className="card seller-card" >
                    <div className="card-body">
                        <h5 className="card-title">{this.props.product.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Price : {this.props.product.price} eth</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Qnt : {this.props.product.qnt}</h6>
                    </div>
                </div>
            </>
        );
    }
}

export default BuyerOrder;