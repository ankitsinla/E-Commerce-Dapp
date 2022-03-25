import React , {Component} from 'react';
import Form from './Form';
import Web3 from 'web3';
import Ecommerce from '../abis/Ecommerce.json';
import SellerProduct from './SellerProduct';
import '../App.css';

class Buyer extends Component{
    
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockChainData()
        await this.checkBuyerPresent()
        await this.getAllProducts()
    }

    async loadBlockChainData(){
        const web3 = window.web3
    
        const accounts = await web3.eth.getAccounts()
        console.log(accounts[0]);
        this.setState({account : accounts[0]})
        const balance = await web3.eth.getBalance(this.state.account)
        this.setState({balance})
        console.log(balance)
    
        //load Ecommerce contract
        const abi = Ecommerce.abi
        const networkId = await web3.eth.net.getId()
        const ecommerceData = Ecommerce.networks[networkId]
        if(ecommerceData){
          const ecommerce = new web3.eth.Contract(abi,ecommerceData.address)
          this.setState({ecommerce})
        }else{
          window.alert('Token contract not deployes to detected network')
        }
      }
    
      async loadWeb3(){
        
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable()
        }
        else if(window.web3){
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else{
          window.alert('Non-ethereum browser , pleases install metamask')
        }
      }

    checkBuyerPresent = async () =>{
        console.log('checking for buyer');
        this.state.ecommerce.methods._isOldBuyer().call({from:this.state.account})
        .then((res) => {
            this.setState({existingBuyer : res});
            console.log(res);
            if(res){
              this.props.updateUser('buyer');
              console.log(res)
            }
        })
    }

    addBuyer = async (name) => {
        this.state.ecommerce.methods.addBuyer(name).send({from:this.state.account})
        .on('receipt',(r) => {
          console.log(r.events.BuyerAdded.returnValues.name)
          this.setState({existingBuyer : true});
          this.props.updateUser('buyer');
        });
    }

    getBuyerOrders = async ()=>{
        console.log('get buyerid')
        this.state.ecommerce.methods._getBuyerId(this.state.account).call({from:this.state.account})
        .then( (res) =>{
          this.setState({buyerId:res});
        })
        console.log('getting buyer orders')
        this.state.ecommerce.methods.getBuyerOrders(this.state.buyerId).call({from:this.state.account})
        .then((res) => {
          console.log(res);
          this.setState({buyerOrders:res})
        })
    }

    getAllProducts = async ()=>{
      this.state.ecommerce.methods.getAllProducts().call()
      .then( (res) =>{
          this.setState({allProducts:res});
          console.log(res);
      })
    }

    updateOrderList = async (newOrder) => {
      this.getBuyerOrders();
      this.getAllProducts();
    }

    constructor(props){
        super(props);
        this.state = {
            existingBuyer : false,
            account: '',
            ecommerce : {},
            buyerOrders: [],
            showProductForm: false,
            allProducts : [],
            buyerId: ''
        }
    }
    render(){
        const allProducts = this.state.allProducts.map((prod) =>{
          let showButton =true;
          return <SellerProduct product={prod} key={prod.pid} showButton={showButton}
          ecommerce = {this.state.ecommerce} acc={this.state.account} updateOrderList={this.updateOrderList}/>
        })

        return(
            <>
                Buyer
                {this.state.existingBuyer ? (
                    <div class="container">
                        <div class="row">
                          <div class="col-sm">
                            <div class="wrapper">
                              {allProducts}
                            </div>
                          </div>
                        </div>
                    </div>
                    )
                  :  <Form add={this.addBuyer} user='Buyer'/>}
            </>
        );
    }
}

export default Buyer;