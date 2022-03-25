// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Products{
    uint public productCount;

    struct Product{
        uint pid;
        string name;
        uint price;
        uint stock;
        address payable sellerAddress;
    }

    Product[] public products;

    mapping(address => uint ) public SellerProductCount;
    function setProd(uint val ) public {
        productCount = val;
    }

    function getProduct(uint index) public view returns(Product memory){
        return products[index];
    }

    function updateStock(uint pid, uint qnt) public {
        products[pid].stock  = products[pid].stock - qnt;
    }

    function getPrice(uint pid) public view returns(uint){
        return products[pid].price;
    }

    function getName(uint pid) public view returns(string memory){
        return products[pid].name;
    }

    function getSellerAddress(uint pid) public view returns(address payable) {
        return products[pid].sellerAddress;
    }

    function getSellerProducts() public view returns(Product[] memory){
        uint counter = SellerProductCount[msg.sender];
        uint flag = 0;
        Product[] memory ans = new Product[](counter);
        for(uint i=0;i<products.length;i++){
            if(products[i].sellerAddress == msg.sender){
                ans[flag] = products[i];
                flag++;
                if(counter == flag){
                    break;
                }
            }
        }
        return ans;
    }

    function getAllProducts() public view returns(Product[] memory){
        return products;
    }
}