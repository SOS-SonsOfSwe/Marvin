pragma solidity ^0.4.2;
import "./UserData.sol";

contract UserLogic {
    UserData user;
    
    constructor(address _dataAddress) public {
        user = UserData(_dataAddress);
    }

    function checkInsertUser(bytes32 _fiscalCode, bytes10 _uniCode) private view returns(bool) {
        if((user.getUsersUniCode(_fiscalCode) == _uniCode) && (user.getUsersIsUser(_fiscalCode) == false)
          && (!user.userExists(msg.sender)) && (msg.sender != user.getUniAddress()))
			return true;
        return false;
    } 

    // signup new user (Users)
    function signUp(bytes32 _fiscalCode, bytes10 _uniCode, bytes32 _hashData) public { 
        require(checkInsertUser(_fiscalCode, _uniCode), "Incorrect unicode or fiscal code");
        // both uniCode and fiscalCode insered by the user are corrects; registration permitted
        user.setAddressMapping(msg.sender, _fiscalCode);
        user.setIsUser(_fiscalCode, true);
        user.setHashData(_fiscalCode, _hashData);
        user.setEtherWithdraw(_fiscalCode, false);
    }

    function login() public view returns(bytes32, uint8, uint32, bytes32) {
        if(msg.sender == user.getUniAddress())
            return("Universita degli studi di Padova", 4, 0, "0");
        require(user.userExists(msg.sender), "User not registered");
        return(user.getRegUsersFiscalCode(msg.sender), user.getRegUsersUserType(msg.sender), 
            user.getRegUsersBadgeNumber(msg.sender), user.getRegUsersHashData(msg.sender));
    }
}