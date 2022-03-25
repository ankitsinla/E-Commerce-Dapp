import React , {Component} from 'react';
import BuyerOrder from './BuyerOrder';

class SellerProducts extends Component {
    async componentDidMount(){
        await this.getSellDetails();
    }

    getSellDetails = async ()=>{
        await this.props.ecommerce.methods.getSellerOrders().call({from:this.props.account})
        .then(res =>{
          this.setState({orders:res});
          console.log(res)
        })
      }

    constructor(props){
        super(props)
        this.state = {
            orders : []
        }
    }


    render(){
        const orders = this.state.orders.map((order,ind) => {
            return <BuyerOrder product={order} key={ind}/>
        })
        return(
            <>
                <div className="container">
                    Seller Orders
                    {this.state.orders.length>0 ? (
                        <div class="container">
                            <div class="row">
                            <div class="col-sm">
                                <div class="wrapper">
                                {orders}
                                </div>
                            </div>
                            </div>
                        </div>
                        )
                    :  <div>No orders yet.</div>}
                </div>
            </>
        );
}
}
export default SellerProducts;