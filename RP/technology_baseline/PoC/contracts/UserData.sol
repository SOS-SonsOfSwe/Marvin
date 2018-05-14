pragma solidity 0.4.23;

contract UserData {
    address uniAddress;
    address logic;
    
    struct User {
        bytes32 uniCode;
        uint32 badgeNumber;
        uint8 userType;         // 0: admin, 1: teacher, 2: student
        bool isUser;
    }
    mapping(bytes32 => User) users;
    mapping(address => bytes32) registeredUsers;        // used for user identification with Metamask
    bytes32[] userIndex;
    
    constructor(address _address) public {
        uniAddress = _address;
    }
    
    modifier onlyLogic() {
        require(msg.sender == logic);
        _;
    }
    function onlyUniversity(address _address) public view returns(bool) {
        return(_address == uniAddress);
    }
    function setLogicAddress(address _msgSender, address _logic) public {
        require(_msgSender == uniAddress);
        logic = _logic;
    }
    function getUsersUniCode(bytes32 _fiscalCode) public view returns(bytes32) {
        return users[_fiscalCode].uniCode;
    }
    function getUsersUserType(bytes32 _fiscalCode) public view returns(uint8) {
        return users[_fiscalCode].userType;
    }
    function getUsersIsUser(bytes32 _fiscalCode) public view returns(bool) {
        return users[_fiscalCode].isUser;
    }
    function getRegUsersUniCode(address _address) public view returns(bytes32) {
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
    // save a new users (for university)
    function setNewUser(bytes32 _fiscalCode, bytes32 _uniCode, uint8 _userType) public onlyLogic { 
        users[_fiscalCode].uniCode = _uniCode;
        users[_fiscalCode].userType = _userType;
        users[_fiscalCode].isUser = false;
    }
    // register a new user (for users)
    function setRegisteredUser(address _address, bytes32 _fiscalCode) public onlyLogic { 
        registeredUsers[_address] = _fiscalCode;
        users[_fiscalCode].isUser = true;
        users[_fiscalCode].badgeNumber = uint32(userIndex.push(_fiscalCode));
    }
    function userExists(address _address) public view returns(bool) {
        return(registeredUsers[_address] != 0);
    }
    function getUniAddress() public view onlyLogic returns(address) {
        return(uniAddress);
    }
}