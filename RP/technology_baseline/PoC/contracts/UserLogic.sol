pragma solidity 0.4.23;
import "./UserData.sol";

contract UserLogic {
    UserData user;
    
    constructor() public {
        user = new UserData(msg.sender);
        user.setLogicAddress(msg.sender, address(this));
    }
    modifier onlyUniversity() {
        require(user.onlyUniversity(msg.sender));
        _;
    }
    
    // add a new user (University)
    function addUser(bytes32 _fiscalCode, bytes32 _uniCode, uint8 _userType) public onlyUniversity {  
        require((user.getUsersUniCode(_fiscalCode) == 0), "Fiscal code already assigned");
        user.setNewUser(_fiscalCode, _uniCode, _userType);
    }
    // signup new user (Users)
    function registerUser(bytes32 _fiscalCode, bytes32 _uniCode) public { 
        require(((user.getUsersUniCode(_fiscalCode) == _uniCode) && (user.getUsersIsUser(_fiscalCode) == false) && 
				   (!user.userExists(msg.sender)) && (msg.sender != user.getUniAddress())), "Incorrect unicode or fiscal code");
        // both uniCode and fiscalCode insered by the user are corrects; registration permitted
        user.setRegisteredUser(msg.sender, _fiscalCode);
    }
    function login() public view returns(bytes32, uint8, uint32) {
        if(msg.sender == user.getUniAddress())
            return("Universita degli studi di Padova", 4, 0);
        require(user.userExists(msg.sender), "User not registered");
        return(user.getRegUsersFiscalCode(msg.sender), user.getRegUsersUserType(msg.sender), user.getRegUsersBadgeNumber(msg.sender));
    }
}