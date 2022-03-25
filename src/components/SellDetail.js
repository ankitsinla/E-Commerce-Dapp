import React , {Component} from 'react';

class SellDetails extends Component {
    render(){
        return(
            <>
                <div>total Orders : {this.props.orders}</div>
                <div>total revenue : {this.props.revenue} eth</div>
            </>
        );
    }
}

export default SellDetails;