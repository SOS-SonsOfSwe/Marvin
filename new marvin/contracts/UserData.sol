pragma solidity ^0.4.2;

contract UserData {
    address uniAddress;
    
    struct User {
        uint32 badgeNumber;
        bytes32 hashData;
        bytes10 uniCode;
        uint8 userType;         // 1: admin, 2: teacher, 3: student
        bool isUser;
        bool etherWithdraw;
    }
    mapping(bytes32 => User) users;
    mapping(address => bytes32) registeredUsers;        // used for user identification with Metamask
    bytes32[] userIndex;
    
    constructor() public {
        uniAddress = msg.sender;
    }

    function isUniversity(address _address) public view returns(bool) {
        return(_address == uniAddress);
    }
    
    function isAdmin(address _address) public view returns(bool) {
        return(users[registeredUsers[_address]].userType == 1);
    }

    function isTeacher(address _address) public view returns(bool) {
        return(users[registeredUsers[_address]].userType == 2);
    }

    function isStudent(address _address) public view returns(bool) {
        return(users[registeredUsers[_address]].userType == 3);
    }
    
    function userExists(address _address) public view returns(bool) {
        return(registeredUsers[_address] != 0);
    }

    function getAllUsers() public view returns(bytes32[]) {
        return userIndex;
    }

    function getUsersUniCode(bytes32 _fiscalCode) public view returns(bytes10) {
        return users[_fiscalCode].uniCode;
    }

    function getUsersUserType(bytes32 _fiscalCode) public view returns(uint8) {
        return users[_fiscalCode].userType;
    }

    function getUsersIsUser(bytes32 _fiscalCode) public view returns(bool) {
        return users[_fiscalCode].isUser;
    }

    function getRegUsersUniCode(address _address) public view returns(bytes10) {
        return users[registeredUsers[_address]].uniCode;
    }

    function getRegUsersFiscalCode(address _address) public view returns(bytes32) {
        return registeredUsers[_address];
    }

    function getRegUsersUserType(address _address) public view returns(uint8) {
        return users[registeredUsers[_address]].userType;
    }

    function getRegUsersBadgeNumber(address _address) public view returns(uint32) {
        return users[registeredUsers[_address]].badgeNumber;
    }

    function getRegUsersHashData(address _address) public view returns(bytes32) {
        return users[registeredUsers[_address]].hashData;
    }

    function getUniAddress() public view returns(address) {
        return uniAddress ;
    }

    function getEtherWithdraw(bytes32 _fiscalCode) public view returns(bool) {
        return users[_fiscalCode].etherWithdraw;
    }

    function setUniCode(bytes32 _fiscalCode, bytes10 _uniCode) public {
        users[_fiscalCode].uniCode = _uniCode;
    }

    function setUserType(bytes32 _fiscalCode, uint8 _userType) public {
        users[_fiscalCode].userType = _userType;
    }

    function setEtherWithdraw(bytes32 _fiscalCode, bool _state) public {
        users[_fiscalCode].etherWithdraw = _state;
    }

    function addAndSetBadgeNumber(bytes32 _fiscalCode) public {
        users[_fiscalCode].badgeNumber = uint32(userIndex.push(_fiscalCode));
    }

    function setAddressMapping(address _address, bytes32 _fiscalCode) public {
        registeredUsers[_address] = _fiscalCode;
    }

    function setIsUser(bytes32 _fiscalCode, bool _isUser) public {
        users[_fiscalCode].isUser = _isUser;
    }

    function setHashData(bytes32 _fiscalCode, bytes32 _hashData) public {
        users[_fiscalCode].hashData = _hashData;
    }
}