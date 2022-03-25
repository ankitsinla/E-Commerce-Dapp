import React , {Component} from 'react';
import Form from './Form';
import Web3 from 'web3';
import Ecommerce from '../abis/Ecommerce.json';
import SellerProduct from './SellerProduct';
import ProductForm from './ProductForm';
import SellDetails from './SellDetail';

class Seller extends Component{
    
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockChainData()
        await this.checkSellerPresent()
        await this.getSellerProduct()
        await this.getSellDetails()
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

    checkSellerPresent = async () =>{
        console.log('checking for seller');
        this.state.ecommerce.methods.isOldSeller().call({from:this.state.account})
        .then((res) => {
            this.setState({existingSeller : res});
            console.log(res);
            if(res){
              this.props.updateUser('seller');
            }
        })
    }

    addSeller = async (name) => {
        this.state.ecommerce.methods.addSeller(name).send({from:this.state.account})
        .on('receipt',(r) => {
          console.log(r.events.SellerAdded.returnValues.name)
          this.setState({existingSeller : true});
          this.props.updateUser('seller');
        });
    }

    getSellerProduct = async ()=>{
        this.state.ecommerce.methods.getSellerProducts().call({from:this.state.account})
        .then( (res) =>{
          this.setState({sellerProducts:res});
        })
    }

    addProduct = async (name,price,stock) => {
        console.log(name,price,stock)
        this.state.ecommerce.methods.addProduct(name,price,stock).send({from:this.state.account}).on('receipt',(r)=>{
          let newProd = r.events.ProductAdded.returnValues;
          console.log(newProd);
          this.setState(prevState => ({sellerProducts : [...prevState.sellerProducts,newProd]}));
        })
      }

    getSellDetails = async ()=>{
      await this.state.ecommerce.methods.getSellerOrders().call({from:this.state.account})
      .then(res =>{
        let totalRevenue = 0;
        let totalOrders = res.length;
        for(let i=0 ;i<totalOrders;i++){
          totalRevenue= totalRevenue+parseInt(res[i].price);
        }
        this.setState({
          totalOrders:totalOrders,
          totalRevenue:totalRevenue
        })
      })
    }

    constructor(props){
        super(props);
        this.state = {
            existingSeller : false,
            account: '',
            ecommerce : {},
            sellerProducts: [],
            totalOrders: 0,
            totalRevenue:0
        }
    }
    render(){
        const products = this.state.sellerProducts.map((prod)=>{
            let showButton =false;
            return <SellerProduct product={prod} key={prod.pid} showButton={showButton} ecommerce = {this.state.ecommerce} acc={this.state.account}/> 
         })
        return(
            <>
                Seller
                {this.state.existingSeller ? (

                    <div class="container">
                      <div class="grid-container">
                        <div class="item2">
                          <h4>Sell Details</h4>
                          <SellDetails revenue={this.state.totalRevenue} orders={this.state.totalOrders}/>
                        </div>
                        <div class="item3">
                          <h3>Your Products</h3>
                          <div class="row">
                            <div class="col-sm">
                                <div class="wrapper-seller">
                                {products}
                                </div>
                            </div>
                            </div>
                        </div>  
                        <div class="item4">
                          <h4>Add New Product</h4>
                          <ProductForm add = {this.addProduct}/>
                        </div>
                      </div>
                    </div>
                        )
                  :  <Form add={this.addSeller} user='seller'/>}

                
            </>
        );
    }
}

export default Seller;