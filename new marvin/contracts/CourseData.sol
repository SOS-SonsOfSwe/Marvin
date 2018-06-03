pragma solidity ^0.4.2;
import "./ExamData.sol";

contract CourseData {
    ExamData exam;

    struct Course {
        bytes10 uniCode;
        bytes32 hashData;
        // codici univoci degli esami di un'attività didattica
        bytes10[] courseExams;
    }

    constructor(address _examContractAddress) public {
        exam = ExamData(_examContractAddress);
    }

    mapping (bytes10 => Course) courses;

    bytes10[] uniCodes;

    function isCourse(bytes10 _courseUniCode) public view returns(bool) {
        if(courses[_courseUniCode].uniCode == "0")
            return false;
        return true;
    }

    // this function should be accessible only by university or admins
    function getAllUniCodes() public view returns(bytes10[]) {
        return uniCodes;
    }

    function getHashData(bytes10 _courseUniCode) public view returns(bytes32) {
        return (courses[_courseUniCode].hashData);
    }
    
    function getCourseExams(bytes10 _courseUniCode) public view returns(bytes10[]) {
        return (courses[_courseUniCode].courseExams);
    }

    function addNewCourse(bytes10 _courseUniCode) public {
        uniCodes.push(_courseUniCode);
    }

    function setUniCode(bytes10 _courseUniCode) public {
        courses[_courseUniCode].uniCode = _courseUniCode;
    }

    function setHashData(bytes10 _courseUniCode, bytes32 _courseHashData) public {
        courses[_courseUniCode].hashData = _courseHashData;
    }

    function addNewExam(bytes10 _courseUniCode, bytes10 _examUniCode) public {
        courses[_courseUniCode].courseExams.push(_examUniCode);
    }
}