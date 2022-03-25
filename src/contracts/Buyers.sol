// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Buyers{
  
    uint public buyerCount = 0 ;

    struct Buyer{
        uint bid;
        string name;
        address buyerAddress;
    }

    struct Order{
        uint pid;
        uint bid;
        uint price;
        string name;
        uint qnt;
        address payable sellerAddress;
    }

    Buyer[] public buyers;

    mapping(uint => Order[]) public orderList;

    event BuyerAdded(uint bid, string name , address buyerAddress);
    event ProductBought(uint bid, uint pid,uint qnt, uint price, address sellerAddress, string prodName);

    function _isOldBuyer() public view returns(bool){
        for(uint i = 0; i<buyers.length ; i++){
            if(msg.sender == buyers[i].buyerAddress)  return true;
        }
        return false;
    }

    modifier onlyNewBuyer() {
        require(!_isOldBuyer());
        _;
    }

    modifier onlyBuyer() {
        require(_isOldBuyer());
        _;
    }

    function addBuyer(string memory _name) public onlyNewBuyer {
        buyerCount++;
        buyers.push(Buyer(buyerCount,_name, msg.sender));
        emit BuyerAdded(buyerCount, _name,msg.sender);
    }

    function getOrderList(uint index) public view returns (Order[] memory){
        return orderList[index];
    }

    function _getBuyerId(address buyerAddress ) public view returns (uint){
        for(uint i= 0 ;i<buyerCount ; i++){
            if(buyers[i].buyerAddress == buyerAddress){
                return buyers[i].bid;
            }
        }
        return 0;
    }

    function addOrder(uint _pid , uint _price , string memory _name ,uint _qnt , address payable sellerAdd) public {
        uint bid = _getBuyerId(msg.sender);
        orderList[bid].push(Order(_pid,bid,_price,_name,_qnt,sellerAdd));
    }

    function getBuyerOrders(uint _bid) public view returns(Order[] memory){
        return orderList[_bid];
    }

    function getSellerOrders() public view returns(Order[] memory){
        uint orderCount = 0;
        for(uint i=1 ;i <= buyerCount ; i++){
            Order[] memory orders = orderList[i];
            for(uint j =0 ; j< orders.length; j++){
                if(orders[j].sellerAddress == msg.sender){
                    orderCount++;
                }
            }
        }
        Order[] memory sellerOrders = new Order[](orderCount);
        uint orderCounter=0;
        for(uint i=1 ;i <= buyerCount ; i++){
            Order[] memory orders = orderList[i];
            for(uint j =0 ; j< orders.length; j++){
                if(orders[j].sellerAddress == msg.sender){
                    sellerOrders[orderCounter] = orders[j];
                    orderCounter++;
                    if(orderCounter == orderCount){
                        break;
                    }
                }
            }
        }
        return sellerOrders;
    }
}