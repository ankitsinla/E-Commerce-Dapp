import '../App.css';
import React, {Component} from 'react';
import Web3 from 'web3';

class SellerProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            product : props.product
        }
    };

    buyProduct = async () => {
        this.props.ecommerce.methods.buyProduct(this.props.product.pid,1)
        .send({from:this.props.acc,value:Web3.utils.toWei(this.props.product.price,"ether")})
        .on('receipt',(r)=>{
            console.log(r.events.ProductBought.returnValues);
            this.props.updateOrderList();
          })
    }

    render(){
        let showBuyButton = this.props.showButton;
        return(
            <div>
                <div className="card seller-card" >
                    <div className="card-body">
                        <h5 className="card-title">{this.props.product.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Price : {this.props.product.price} eth</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Rem. Stock : {this.props.product.stock}</h6>
                        {showBuyButton && 
                         <button className='btn btn-primary' onClick={() => this.buyProduct()}>Buy</button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default SellerProduct