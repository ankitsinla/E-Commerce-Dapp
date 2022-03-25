import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Ecommerce from './abis/Ecommerce.json';
import ProductForm from './components/ProductForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Seller from './components/Seller';
import BuyerOrders from './components/BuyerOrders';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Buyer from './components/Buyer';
import SellerProducts from './components/SellerProducts';


class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockChainData()
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

  updateUser = (updatedUser) =>{
    console.log(updatedUser)
    this.setState({user:updatedUser});
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      balance: '0',
      ecommerce:{},
      user : 'null'
    }
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Navbar user={this.state.user} updateUser={this.updateUser}/>
          <Routes>
            <Route path='/buyer/orders' element={<BuyerOrders account={this.state.account} ecommerce={this.state.ecommerce}  updateUser={this.updateUser}/>}/>  
            <Route path='/buyer' element={<Buyer updateUser={this.updateUser}/>}/>            
            <Route path='/seller/selldetails' element={<SellerProducts account={this.state.account} ecommerce={this.state.ecommerce}  updateUser={this.updateUser}/>}/>  
            <Route path='/seller' element={<Seller updateUser={this.updateUser} />}/>
            <Route path='/products' element={<ProductForm add = {this.addProduct}/>}/>
            <Route path='/' element={<Home />}/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
