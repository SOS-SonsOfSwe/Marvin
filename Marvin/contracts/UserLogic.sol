pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ContractManager.sol";

contract UserLogic {
    address uniAddress;
    ContractManager manager;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    function checkInsertUser(bytes32 _fiscalCode, bytes10 _uniCode) private view returns(bool) {
        UserData user = UserData(manager.getUserDataContract());
        if((user.getUsersUniCode(_fiscalCode) == _uniCode) && (user.getUsersIsUser(_fiscalCode) == false)
          && (!user.userExists(msg.sender)) && (msg.sender != user.getUniAddress()))
			return true;
        return false;
    } 

    function signUp(bytes32 _fiscalCode, bytes10 _uniCode, bytes32 _hashData) public { 
        UserData user = UserData(manager.getUserDataContract());
        require(checkInsertUser(_fiscalCode, _uniCode), "Incorrect unicode or fiscal code");
        // both uniCode and fiscalCode insered by the user are corrects; registration permitted
        user.setAddressMapping(msg.sender, _fiscalCode);
        user.setIsUser(_fiscalCode, true);
        user.setHashData(_fiscalCode, _hashData);
    }

    function login() public view returns(bytes32, uint8, uint32, bytes32) {
        UserData user = UserData(manager.getUserDataContract());
        if(msg.sender == user.getUniAddress())
            return("Universita degli studi di Padova", 4, 0, "0");
        require(user.userExists(msg.sender), "User not registered");
        return(user.getRegUsersData(msg.sender));
    }
}