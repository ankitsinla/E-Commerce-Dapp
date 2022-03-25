// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
import './Products.sol';
import './Sellers.sol';
import './Buyers.sol';

contract Ecommerce is Products, Sellers, Buyers{
    function addSeller(string memory _name) public onlyNewSeller {
        sellers.push(Seller(_name, msg.sender));
        emit SellerAdded(_name, msg.sender);
    }

    function addProduct(string memory _name, uint _price , uint _stock) public onlySeller {
        require(_stock > 0);
        require(_price > 0);

        productCount++;
        products.push(Product(productCount,_name, _price, _stock,msg.sender));
        SellerProductCount[msg.sender]++;
        emit ProductAdded(productCount, _name, _price, _stock, msg.sender);
    }

    function buyProduct(uint _pid, uint _qnt ) public payable onlyBuyer{
        uint index = _pid -1;

        Product memory prod = getProduct(index);
       
        address payable sellerAddress = prod.sellerAddress;
        sellerAddress.transfer(msg.value);
        
        updateStock(index, _qnt);

        addOrder(_pid,prod.price,prod.name,_qnt,sellerAddress);
        uint buyerid = _getBuyerId(msg.sender);
        emit ProductBought( buyerid, _pid, _qnt, prod.price, sellerAddress , prod.name);
    }

    // function () public view returns(Seller[] memory){
    //     return sellers;
    // }


}