pragma solidity ^0.4.2;
import "./ExamData.sol";
import "./ContractManager.sol";
import "./UserData.sol";

contract CourseData {
    address uniAddress;
    ContractManager manager;

    struct Course {
        bytes10 uniCode;
        bytes32 hashData;
        // exams unicodes of the course
        bytes10[] courseExams;
    }

    // key = course unicode, value = Course
    mapping (bytes10 => Course) courses;

    // array of all the courses unicodes
    bytes10[] uniCodes;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    modifier onlyAdminContract() {
        require(msg.sender == manager.getAdminContract());
        _;
    }

    function isCourse(bytes10 _courseUniCode) public view returns(bool) {
        if(courses[_courseUniCode].uniCode == 0)
            return false;
        return true;
    }

    function getHashData(bytes10 _courseUniCode) public view returns(bytes32) {
        return (courses[_courseUniCode].hashData);
    }
    
    // return all the exams of the course
    function getCourseExams(bytes10 _courseUniCode) public view returns(bytes10[]) {
        return (courses[_courseUniCode].courseExams);
    }

    // return all the course exams and their IPFS hashes
    function getCourseExamsData(bytes10 _courseUniCode) public view returns(bytes10[], bytes32[]) {
        bytes10[] memory examsForCourse = courses[_courseUniCode].courseExams;
        bytes32[] memory examsHashCodes = new bytes32[](examsForCourse.length);
        for(uint i = 0; i < examsForCourse.length; ++i) {
            examsHashCodes[i] = courses[examsForCourse[i]].hashData;
        }
        return(examsForCourse, examsHashCodes);
    }

    function setUniCode(bytes10 _courseUniCode) public onlyAdminContract {
        courses[_courseUniCode].uniCode = _courseUniCode;
    }

    function addNewCourse(bytes10 _courseUniCode) public onlyAdminContract {
        uniCodes.push(_courseUniCode);
    }

    function setHashData(bytes10 _courseUniCode, bytes32 _courseHashData) public onlyAdminContract {
        courses[_courseUniCode].hashData = _courseHashData;
    }

    function addNewExam(bytes10 _courseUniCode, bytes10 _examUniCode) public onlyAdminContract {
        courses[_courseUniCode].courseExams.push(_examUniCode);
    }

    function deleteCourse(bytes10 _courseUniCode) public onlyAdminContract {
        delete courses[_courseUniCode];
    }
}