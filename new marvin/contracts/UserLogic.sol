pragma solidity 0.4.23;
import "./UserData.sol";

contract UserLogic {
    UserData user;
    
    constructor() public {
        user = new UserData(msg.sender);
        user.setLogicAddress(msg.sender, address(this));
    }
    modifier onlyUniversity() {
        require(user.isUniversity(msg.sender));
        _;
    }
    modifier onlyUniAdmin() {
        require(user.isAdmin(msg.sender) || user.isUniversity(msg.sender));
        _;
    }
    function checkInsertUser(bytes32 _fiscalCode, bytes10 _uniCode) private view returns(bool) {
        if((user.getUsersUniCode(_fiscalCode) == _uniCode) && (user.getUsersIsUser(_fiscalCode) == false) && 
				   (!user.userExists(msg.sender)) && (msg.sender != user.getUniAddress()))
			return true;
		return false;
    } 
    // add a new user (University)
    function addUser(bytes32 _fiscalCode, bytes10 _uniCode, uint8 _userType) public payable onlyUniAdmin {  
        require((user.getUsersUniCode(_fiscalCode) == 0), "Fiscal code already assigned");
        user.setNewUser(_fiscalCode, _uniCode, _userType, true);
    }
    // signup new user (Users)
    function registerUser(bytes32 _fiscalCode, bytes10 _uniCode, bytes32 _hashData) public { 
        require(checkInsertUser(_fiscalCode, _uniCode), "Incorrect unicode or fiscal code");
        // both uniCode and fiscalCode insered by the user are corrects; registration permitted
        user.setRegisteredUser(msg.sender, _fiscalCode, _hashData);
        msg.sender.transfer(0.1 ether);
    }
    function login() public view returns(bytes32, uint8, uint32, bytes32) {
        if(msg.sender == user.getUniAddress())
            return("Universita degli studi di Padova", 4, 0, "0");
        require(user.userExists(msg.sender), "User not registered");
        return(user.getRegUsersFiscalCode(msg.sender), user.getRegUsersUserType(msg.sender), 
				user.getRegUsersBadgeNumber(msg.sender), user.getRegUsersHashData(msg.sender));
    }
    function deposit() public payable {}
    /*  Per ora già implementato in registerUser()
    function requestInitialEther(bytes32 _fiscalCode, bytes10 _uniCode) private {
        require((user.getUsersUniCode(_fiscalCode) == _uniCode) && (msg.sender != user.getUniAddress()) && 
                (user.getEtherWithdraw(_fiscalCode)), "Bad input data or not allowed to withdraw");
        msg.sender.transfer(0.1 ether);
        user.setEtherWithdraw(_fiscalCode, false);
    }
    */
    function balance() public view returns(uint256) {
        return address(this).balance;
    }
}