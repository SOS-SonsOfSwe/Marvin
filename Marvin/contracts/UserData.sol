pragma solidity ^0.4.2;
import "./ContractManager.sol";

contract UserData {
    address uniAddress;
    ContractManager manager;
    
    struct User {
        uint8 userType;         // 1: admin, 2: teacher, 3: student
        bool isUser;
        uint32 badgeNumber;
        bytes10 uniCode;
        bytes32 hashData;
    }
    // key = user fiscal code
    mapping(bytes32 => User) users;
    mapping(address => bytes32) registeredUsers;        // used for user identification with Metamask
    // users fiscal codes
    bytes32[] userIndex;
    
    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    modifier onlyLogicContract() {
        require(msg.sender == manager.getUserLogicContract());
        _;
    }

    modifier onlyAdminContract() {
        require(msg.sender == manager.getAdminContract());
        _;
    }

    // MODIFICATORE
    function isAdmin(address _address) public view returns(bool) {
        return(users[registeredUsers[_address]].userType == 1);
    }
    
    // MODIFICATORE
    function userExists(address _address) public view returns(bool) {
        return(registeredUsers[_address] != 0);
    }

    // MODIFICATORE
    function userExistsBadge(uint32 _badgeNumber)public view returns(bool) {
        bytes32 CF = userIndex[_badgeNumber - 1];
        return(users[CF].isUser);
    }

    // MODIFICATORE
    function getAllUsers() public view returns(bytes32[]) {
        return userIndex;
    }

    // MODIFICATORE
    function getUsersUniCode(bytes32 _fiscalCode) public view returns(bytes10) {
        return users[_fiscalCode].uniCode;
    }

    // MODIFICATORE
    function getUsersUserType(bytes32 _fiscalCode) public view returns(uint8) {
        return users[_fiscalCode].userType;
    }

    // MODIFICATORE
    function getUsersBadgeNumber(bytes32 _fiscalCode) public view returns(uint32) {
        return users[_fiscalCode].badgeNumber;
    }

    // MODIFICATORE
    function getUsersIsUser(bytes32 _fiscalCode) public view returns(bool) {
        return users[_fiscalCode].isUser;
    }

    // MODIFICATORE
    function getUsersHashData(bytes32 _fiscalCode) public view returns(bytes32) {
        if(users[_fiscalCode].isUser)
            return(users[_fiscalCode].hashData);
        return(0);
    }

    // MODIFICATORE
    function getRegUsersData(address _address) public view returns(bytes32, uint8, uint32, bytes32) {
        return(registeredUsers[_address], users[registeredUsers[_address]].userType, 
            users[registeredUsers[_address]].badgeNumber, users[registeredUsers[_address]].hashData);
    }

    // MODIFICATORE
    function getRegUsersBadgeNumber(address _address) public view returns(uint32) {
        return users[registeredUsers[_address]].badgeNumber;
    }

    // MODIFICATORE
    function getUniAddress() public view returns(address) {
        return uniAddress ;
    }

    function setUniCode(bytes32 _fiscalCode, bytes10 _uniCode) public onlyAdminContract {
        users[_fiscalCode].uniCode = _uniCode;
    }

    function setUserType(bytes32 _fiscalCode, uint8 _userType) public onlyAdminContract {
        users[_fiscalCode].userType = _userType;
    }

    function addAndSetBadgeNumber(bytes32 _fiscalCode) public onlyAdminContract returns(uint32) {
        users[_fiscalCode].badgeNumber = uint32(userIndex.push(_fiscalCode));
        return(users[_fiscalCode].badgeNumber);
    }

    function setAddressMapping(address _address, bytes32 _fiscalCode) public onlyLogicContract {
        registeredUsers[_address] = _fiscalCode;
    }

    function setIsUser(bytes32 _fiscalCode, bool _isUser) public onlyLogicContract {
        users[_fiscalCode].isUser = _isUser;
    }

    function setHashData(bytes32 _fiscalCode, bytes32 _hashData) public onlyLogicContract {
        users[_fiscalCode].hashData = _hashData;
    }

    function deleteUserArray(uint32 _user) public onlyAdminContract {
        delete userIndex[_user - 1];
    }

    function deleteUserMap(uint32 _user) public onlyAdminContract {
        delete users[userIndex[_user - 1]];
    }
}