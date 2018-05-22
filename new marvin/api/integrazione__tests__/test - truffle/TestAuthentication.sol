pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Authentication.sol";

contract TestAuthentication {

  function testUserCanSignUpAndLogin() {
    Authentication authentication = Authentication(DeployedAddresses.Authentication());

    authentication.signup('testuser', 'itHasASurname');

    bytes32 expectedName = 'testuser';
    bytes32 expectedSurname = 'itHasASurname';

    bytes32 testName;
    bytes32 testSurname;

    (testName, testSurname) = authentication.login();

    Assert.equal(testName, expectedName , "It should sign up and log in a user.");
    Assert.equal(testSurname, expectedSurname , "It should sign up and log in a user.");
  }

}
