// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Sellers{

    struct Seller{
        string name;
        address payable sellerAddress;
    }

    Seller[] public sellers;

    event SellerAdded(
        string name,
        address payable sellerAddress
    );

    event ProductAdded(
        uint pid,
        string name,
        uint price,
        uint stock,
        address payable sellerAddress
    );

    function isOldSeller() public view returns(bool){
        for(uint i = 0; i<sellers.length ; i++){
            if(msg.sender == sellers[i].sellerAddress)  return true;
        }
        return false;
    }

    modifier onlyNewSeller() {
        require(!isOldSeller());
        _;
    }

    modifier onlySeller() {
        require(isOldSeller());
        _;
    }

    function getSeller() public view returns(Seller memory){
        for(uint i = 0; i<sellers.length ; i++){
            if(msg.sender == sellers[i].sellerAddress)  return sellers[i];
        }
        return sellers[0];
    }

}