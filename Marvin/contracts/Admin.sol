pragma solidity ^0.4.2;
import "./UserData.sol";
import "./DegreeData.sol";
import "./StudentData.sol";
import "./ContractManager.sol";

contract Admin {
    address uniAddress;
    ContractManager manager;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    modifier onlyAdmin() {
        require((msg.sender == uniAddress) || UserData(manager.getUserDataContract()).isAdmin(msg.sender));
        _;
    }

    function addUser(bytes32 _fiscalCode, bytes10 _uniCode, uint8 _userType, bytes10 _degreeUniCode) public onlyAdmin { 
        UserData user = UserData(manager.getUserDataContract()); 
        require((user.getUsersUniCode(_fiscalCode) == 0), "Fiscal code already assigned");
        user.setUniCode(_fiscalCode, _uniCode);
        user.setUserType(_fiscalCode, _userType);
        uint32 badgeNumber = user.addAndSetBadgeNumber(_fiscalCode);
        if(_userType == 3)
            StudentData(manager.getStudentDataContract()).setStudentDegree(badgeNumber, _degreeUniCode);
    }

    function addNewYear(bytes4 _year) public onlyAdmin {
        DegreeData degree = DegreeData(manager.getDegreeContract());
        require(!degree.isYear(_year));
        degree.addYear(_year);
    }

    function addNewDegree(bytes10 _degreeUniCode, bytes4 _year, bytes32 _hashData) public onlyAdmin {
        DegreeData degree = DegreeData(manager.getDegreeContract());
        require(!degree.isDegree(_degreeUniCode));
        degree.addYearDegree(_degreeUniCode, _year);
        degree.setHashData(_degreeUniCode, _hashData);
    }

    function addNewClass(bytes10 _degreeuniCode, bytes10 _classUniCode, bytes32 _classHashData, uint32 _teacherBadgeNumber) public onlyAdmin {
        ClassData class = ClassData(manager.getClassContract());
        require(!class.isClass(_classUniCode));
        uint16 index = DegreeData(manager.getDegreeContract()).addNewClass(_degreeuniCode, _classUniCode);
        class.setUniCode(_classUniCode);
        class.setHashData(_classUniCode, _classHashData);
        class.setIndex(_classUniCode, index);
        class.setClassTeacher(_classUniCode, _teacherBadgeNumber);
    }

    function addNewExam(bytes10 _classUniCode, bytes10 _examUniCode, bytes32 _examHashData) public onlyAdmin {
        ExamData exam = ExamData(manager.getExamContract());
        require(!exam.isExam(_examUniCode));
        uint16 index = ClassData(manager.getClassContract()).addNewExam(_classUniCode, _examUniCode);
        exam.setUniCode(_examUniCode);
        exam.setHashData(_examUniCode, _examHashData);
        exam.setIndex(_examUniCode, index);
    }

    function getUsersBadgeType() public view onlyAdmin returns(uint32[], uint8[]) {
        UserData user = UserData(manager.getUserDataContract()); 
        bytes32[] memory allUsersCF = user.getAllUsers();
        uint32[] memory usersBadge = new uint32[](allUsersCF.length);
        uint8[] memory usersType = new uint8[](allUsersCF.length);
        for(uint i = 0; i < allUsersCF.length; ++i) {
            usersBadge[i] = user.getUsersBadgeNumber(allUsersCF[i]);
            usersType[i] = user.getUsersUserType(allUsersCF[i]);
        }
        return(usersBadge, usersType);
    }
    
    function getUsersData() public view onlyAdmin returns(bytes32[], bytes32[], uint32[], uint8[], bool[]) {
        UserData user = UserData(manager.getUserDataContract()); 
        bytes32[] memory allUsersCF = user.getAllUsers();
        uint32[] memory usersBadge = new uint32[](allUsersCF.length);
        bytes32[] memory usersHash = new bytes32[](allUsersCF.length);
        uint8[] memory usersType = new uint8[](allUsersCF.length);
        bool[] memory usersRegistered = new bool[](allUsersCF.length);
        for(uint i = 0; i < allUsersCF.length; ++i) {
            usersBadge[i] = user.getUsersBadgeNumber(allUsersCF[i]);
            usersHash[i] = user.getUsersHashData(allUsersCF[i]);
            usersType[i] = user.getUsersUserType(allUsersCF[i]);
            usersRegistered[i] = user.getUsersIsUser(allUsersCF[i]);
        }
        return(allUsersCF, usersHash, usersBadge, usersType, usersRegistered);
    }

    function removeExam(bytes10 _classUniCode, bytes10 _examUniCode) public onlyAdmin {
        ExamData exam = ExamData(manager.getExamContract());
        uint16 index = exam.getIndex(_examUniCode);
        ClassData(manager.getClassContract()).deleteExam(_classUniCode, index);
        exam.resetExam(_examUniCode);
    }

    function removeClass(bytes10 _degreeUniCode, bytes10 _classUniCode) public onlyAdmin {
        ClassData class = ClassData(manager.getClassContract());
        uint16 index = class.getIndex(_classUniCode);
        DegreeData(manager.getDegreeContract()).deleteClass(_degreeUniCode, index);
        class.resetClass(_classUniCode);
    }

    function removeDegree(bytes10 _degreeUnicode, bytes4 _degreeYear) public onlyAdmin {
        DegreeData(manager.getDegreeContract()).deleteDegree(_degreeUnicode, _degreeYear);
    }

    function removeYear(bytes4 _year) public onlyAdmin {
        DegreeData(manager.getDegreeContract()).deleteYear(_year);
    }

    function removeUser(uint32 _user) public onlyAdmin {
        UserData user = UserData(manager.getUserDataContract()); 
        require(user.userExistsBadge(_user));
        user.deleteUserMap(_user);
        user.deleteUserArray(_user);
    }

    function getClassIndex(bytes10 _classUniCode) public view returns(uint16) {
        return(ClassData(manager.getClassContract()).getIndex(_classUniCode));
    }

    function getExamIndex(bytes10 _examUniCode) public view returns(uint16) {
        return(ExamData(manager.getExamContract()).getIndex(_examUniCode));
    }
}