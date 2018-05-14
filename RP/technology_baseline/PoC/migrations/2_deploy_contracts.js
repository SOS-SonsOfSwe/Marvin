// var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
// var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
// var Authentication = artifacts.require("./Authentication.sol");
// var UserData = artifacts.require("./UserData.sol");

// var UserData = artifacts.require("./UserData.sol");
var UserLogic = artifacts.require("./UserLogic.sol");

module.exports = function(deployer) {
  // deployer.deploy(Ownable);
  // deployer.link(Ownable, Killable);
  // deployer.deploy(Killable);
  // deployer.link(Killable, Authentication);
  // deployer.deploy(Authentication);
  // deployer.deploy(UserData);
  // deployer.deploy(UserData);
  deployer.deploy(UserLogic);
  //deployer.link(UserData, UserLogic);

};
