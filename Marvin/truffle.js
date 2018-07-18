/* Rinkeby deploy
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "army despair twelve hand humor elder inject race test fancy swap disorder";

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/LRu2EZiQXhsNHvp7SCtK")
      },
      network_id: 3
    }   
  }
};
// mnemonic address 10+ ETH Rinkeby: smooth noodle laptop april bitter steak spare elevator orbit pipe climb shine
// mnemonic address 5 ETH Rinkeby (completato deploy?): army despair twelve hand humor elder inject race test fancy swap disorder
*/

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