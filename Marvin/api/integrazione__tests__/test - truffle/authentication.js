var Authentication = artifacts.require("./Authentication.sol");

contract('Authentication', function(accounts) {

  it("...should sign up and log in a user.", function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;

      return authenticationInstance.signup('testuser','itHasASurname' ,  {from: accounts[0]});
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function(userName) {
      assert.equal(web3.toUtf8(userName[0]), 'testuser', "The user was not signed up.");
      assert.equal(web3.toUtf8(userName[1]), 'itHasASurname', "The user was not signed up.");
    });
  });

});
