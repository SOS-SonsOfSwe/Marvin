//Rinkeby deploy
/*
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "glue bamboo mesh urge glimpse truly vault reunion engine uncover strong capable";

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/LRu2EZiQXhsNHvp7SCtK")
      },
      network_id: 4
    }   
  }
};
*/
// mnemonic address 10+ ETH Rinkeby: smooth noodle laptop april bitter steak spare elevator orbit pipe climb shine
// mnemonic address 0... ETH Rinkeby: army despair twelve hand humor elder inject race test fancy swap disorder
// mnemonic address 15+ ETH Rinkeby:glue bamboo mesh urge glimpse truly vault reunion engine uncover strong capable

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  //module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*", // Match any network id
      gasPrice: 1000000000
    }
  }
};