const { assert } = require('chai');


const Ecommerce = artifacts.require("Ecommerce");

require('chai').use(require('chai-as-promised')).should()


contract('E-commerce',async ([sell, buy])=>{
    let ecommerce;

    before(async () =>{
        ecommerce = await Ecommerce.new();
    })

    describe('seller contract' , async () =>{
        it('New Seller added', async () => {
            
            let newSeller = await ecommerce.addSeller("a");
            let event = newSeller.logs[0].args;
            
            assert.equal(event.name,"a");
            assert.equal(event.sellerAddress,sell);
        })
        it('New product added by seller', async () => {
            
            let newProd = await ecommerce.addProduct("aprod",1,2);
            let prodCount = await ecommerce.productCount();
            let event = newProd.logs[0].args;

            assert.equal(1,prodCount.toNumber());
            assert.equal(event.name,"aprod" );
            assert.equal(event.sellerAddress,sell);
            assert.equal(event.stock,2);
        })
    })

    describe('Buyer contract', async () => {
        it('new buyer added',async ()=>{
            let nbuyer = await ecommerce.addBuyer('b',{from:buy});
            let event = nbuyer.logs[0].args;
            let buyerCount = await ecommerce.buyerCount();

            assert.equal(event.bid.toNumber(),buyerCount.toNumber());
            assert.equal(event.name,'b');
            assert.equal(event.buyerAddress, buy);
            assert.equal(buyerCount.toNumber(),1);
        }) 

        it('buy product', async ()=> {
            let bprod = await ecommerce.buyProduct(1,1,1,{from:buy,value:1});
            let event = bprod.logs[0].args;

            assert.equal(event.bid.toNumber(),1);
            assert.equal(event.pid.toNumber(),1);
            assert.equal(event.qnt.toNumber(),1);
            assert.equal(event.sellerAddress,sell);
        })
    })
})