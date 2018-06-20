pragma solidity ^0.4.2;
import "./UserData.sol";
import "./DegreeData.sol";
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

    function addUser(bytes32 _fiscalCode, bytes10 _uniCode, uint8 _userType) public onlyAdmin { 
        UserData user = UserData(manager.getUserDataContract()); 
        require((user.getUsersUniCode(_fiscalCode) == 0), "Fiscal code already assigned");
        user.setUniCode(_fiscalCode, _uniCode);
        user.setUserType(_fiscalCode, _userType);
        user.addAndSetBadgeNumber(_fiscalCode);
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

    function addNewCourse(bytes10 _degreeuniCode, bytes10 _courseUniCode, bytes32 _courseHashData) public onlyAdmin {
        CourseData course = CourseData(manager.getCourseContract());
        require(!course.isCourse(_courseUniCode));
        DegreeData(manager.getDegreeContract()).addCourse(_degreeuniCode, _courseUniCode);
        course.addNewCourse(_courseUniCode);
        course.setUniCode(_courseUniCode);
        course.setHashData(_courseUniCode, _courseHashData);
    }

    function addNewExam(bytes10 _courseUniCode, bytes10 _examUniCode, bytes32 _examHashData) public onlyAdmin {
        ExamData exam = ExamData(manager.getExamContract());
        CourseData course = CourseData(manager.getCourseContract());
        require(!exam.isExam(_examUniCode));
        course.addNewExam(_courseUniCode, _examUniCode);
        exam.addNewExam(_examUniCode);
        exam.setHashData(_examUniCode, _examHashData);
        exam.setActiveSubscription(_examUniCode, true);
    }

    function setExamTeacher(bytes10 _examUniCode, uint32 _teacherBadgeNumber) public onlyAdmin {
        ExamData(manager.getExamContract()).setExamTeacher(_examUniCode, _teacherBadgeNumber);
    }

    function setStudentDegree(address _studentAddress, bytes10 _degree) public onlyAdmin {
        DegreeData(manager.getDegreeContract()).setDegree(_studentAddress, _degree);
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

    function removeExam(bytes10 _examUnicode) public onlyAdmin {
        ExamData(manager.getExamContract()).deleteExam(_examUnicode);
    }

    function removeCourse(bytes10 _courseUnicode) public onlyAdmin {
        CourseData(manager.getCourseContract()).deleteCourse(_courseUnicode);
    }

    function removeDegree(bytes10 _degreeUnicode) public onlyAdmin {
        DegreeData(manager.getDegreeContract()).deleteDegree(_degreeUnicode);
    }

    function removeYear(bytes4 _year) public onlyAdmin {
        DegreeData(manager.getDegreeContract()).deleteYear(_year);
    }

    function removeUser(uint32 _user) public onlyAdmin {
        UserData user = UserData(manager.getUserDataContract()); 
        user.deleteUserMap(_user);
        user.deleteUserArray(_user);
    }
}