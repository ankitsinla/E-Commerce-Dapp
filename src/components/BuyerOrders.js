import React, {Component} from "react";
import BuyerOrder from "./BuyerOrder";

class BuyerOrders extends Component{

    async componentDidMount(){
        await this.getOrders();
    }

    getOrders = async () => {
        console.log('getting buyer id');
        await this.props.ecommerce.methods._getBuyerId(this.props.account).call()
        .then((res)=>{
            console.log(`buyer id : ${res}`);
            this.setState({bid:res});
        })
        console.log('getting orderes');
        await this.props.ecommerce.methods.getBuyerOrders(this.state.bid).call()
        .then(res => {
            console.log(res);
            this.setState({orders:res});
        })
    }

    constructor(props){
        super(props)
        this.state = {
            bid: 0,
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
                    Buyer Orders
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
                    :  <div>No orders yet . Buy Now</div>}
                </div>
            </>
        );
    }
}

export default BuyerOrders;