pragma solidity ^0.4.2;

contract ContractManager {
    address uniAddress;
    address adminContract;
    address courseContract;
    address degreeContract;
    address examContract;
    address studentDataContract;
    address studentContract;
    address teacherContract;
    address userDataContract;
    address userLogicContract;

    constructor() public {
        uniAddress = msg.sender;
    }
    
    modifier onlyUniversity() {
        require(msg.sender == uniAddress);
        _;
    }

    function getAdminContract() public view returns(address) {
        return adminContract;
    }
    function getCourseContract() public view returns(address) {
        return courseContract;
    }
    function getDegreeContract() public view returns(address) {
        return degreeContract;
    }
    function getExamContract() public view returns(address) {
        return examContract;
    }
    function getStudentDataContract() public view returns(address) {
        return studentDataContract;
    }
    function getStudentContract() public view returns(address) {
        return studentContract;
    }
    function getTeacherContract() public view returns(address) {
        return teacherContract;
    }
    function getUserDataContract() public view returns(address) {
        return userDataContract;
    }
    function getUserLogicContract() public view returns(address) {
        return userLogicContract;
    }

    function setUserDataContract(address _userData) public onlyUniversity {
        userDataContract = _userData;
    }
    function setUserLogicContract(address _userLogic) public onlyUniversity {
        userLogicContract = _userLogic;
    }
    function setExamContract(address _exam) public onlyUniversity {
        examContract = _exam;
    }
    function setCourseContract(address _course) public onlyUniversity {
        courseContract = _course;
    }
    function setDegreeContract(address _degree) public onlyUniversity {
        degreeContract = _degree;
    }
    function setStudentDataContract(address _studentData) public onlyUniversity {
        studentDataContract = _studentData;
    }
    function setStudentContract(address _student) public onlyUniversity {
        studentContract = _student;
    }
    function setTeacherContract(address _teacher) public onlyUniversity {
        teacherContract = _teacher;
    }
    function setAdminContract(address _admin) public onlyUniversity {
        adminContract = _admin;
    }
}