const Sellers = artifacts.require("Sellers");
const Products = artifacts.require("Products");
const Buyers = artifacts.require("Buyers");
const Ecommerce = artifacts.require("Ecommerce");

module.exports = function(deployer) {
  deployer.deploy(Sellers);
  deployer.deploy(Products);
  deployer.deploy(Buyers);
  deployer.deploy(Ecommerce);
};
