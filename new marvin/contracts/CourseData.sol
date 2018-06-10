pragma solidity ^0.4.2;
import "./ExamData.sol";

contract CourseData {
    ExamData exam;

    struct Course {
        // course identifier
        bytes10 uniCode;
        // course IPFS hash
        bytes32 hashData;
        // exams unicodes of the course
        bytes10[] courseExams;
    }

    constructor(address _examContractAddress) public {
        exam = ExamData(_examContractAddress);
    }
    // key = course unicode, value = Course
    mapping (bytes10 => Course) courses;
    // array of all the courses unicodes
    bytes10[] uniCodes;
    
    // return true only if _courseUnicode is a Course
    function isCourse(bytes10 _courseUniCode) public view returns(bool) {
        if(courses[_courseUniCode].uniCode == "0")
            return false;
        return true;
    }
    
    // return all courses unicodes
    function getAllUniCodes() public view returns(bytes10[]) {
        return uniCodes;
    }

    // return the IPFS hash of the course
    function getHashData(bytes10 _courseUniCode) public view returns(bytes32) {
        return (courses[_courseUniCode].hashData);
    }
    
    // return all the exams of the course
    function getCourseExams(bytes10 _courseUniCode) public view returns(bytes10[]) {
        return (courses[_courseUniCode].courseExams);
    }

    // return all the exams of a course unicodes and their IPFS hashes of a course
    function getCourseExamsData(bytes10 _courseUniCode) public view returns(bytes10[], bytes32[]) {
        bytes10[] memory examsForCourse = getCourseExams(_courseUniCode);
        bytes32[] memory examsHashCodes = new bytes32[](examsForCourse.length);
        for(uint i = 0; i < examsForCourse.length; ++i) {
            examsHashCodes[i] = courses[examsForCourse[i]].hashData;
        }
        return(examsForCourse, examsHashCodes);
    }

    // set the course unicode
    function setUniCode(bytes10 _courseUniCode) public {
        courses[_courseUniCode].uniCode = _courseUniCode;
    }

    // add a new course to unicodes[]
    function addNewCourse(bytes10 _courseUniCode) public {
        uniCodes.push(_courseUniCode);
    }

    // set the IPFS hash of the course
    function setHashData(bytes10 _courseUniCode, bytes32 _courseHashData) public {
        courses[_courseUniCode].hashData = _courseHashData;
    }

    // add an exam of the course
    function addNewExam(bytes10 _courseUniCode, bytes10 _examUniCode) public {
        courses[_courseUniCode].courseExams.push(_examUniCode);
    }
}