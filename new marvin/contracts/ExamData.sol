pragma solidity ^0.4.2;
import "./ContractManager.sol";

contract ExamData {
    address uniAddress;
    ContractManager manager;

    struct Exam {
        uint16 index;
        bytes10 uniCode;
        bytes32 hashData;
        // subscribed student badgeNumber
        uint32[] subscribedStudents;
        // students result (not accepted yet) 
        mapping (uint32 => uint8) unconfirmedResults;
        // students result (accepted) 
        mapping (uint32 => uint8) confirmedResults;
    }

    // key = exams uniCode, value = related Exam
    mapping (bytes10 => Exam) exams;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    modifier onlyAdminContract() {
        require(msg.sender == manager.getAdminContract());
        _;
    }

    modifier onlyStudentContract() {
        require(msg.sender == manager.getStudentContract());
        _;
    }

    modifier onlyTeacherContract() {
        require(msg.sender == manager.getTeacherContract());
        _;
    }

    // return accepted student result
    function getConfirmedResult(uint32 _studentBadgeNumber, bytes10 _examUniCode) public view returns(uint8) {
        return(exams[_examUniCode].confirmedResults[_studentBadgeNumber]);
    }

    function getHashData(bytes10 _examUniCode) public view returns(bytes32) {
        return(exams[_examUniCode].hashData);
    }

    // return exam subscribed students
    function getExamSubscribedStudent(bytes10 _examUniCode) public view returns(uint32[]) {
        return(exams[_examUniCode].subscribedStudents);
    }

    function setHashData(bytes10 _examUniCode, bytes32 _hashData) public onlyAdminContract {
        exams[_examUniCode].hashData = _hashData;
    }

    function isExam(bytes10 _examUniCode) public view returns(bool) {
        if(exams[_examUniCode].uniCode == 0)
            return false;
        return true;
    }

    // return true only if the student is subscribed to the exam
    function isStudentSubscribed(bytes10 _examUniCode, uint32 _studentBadgeNumber) public view returns(bool) {
        uint32[] memory subscribedStudent = exams[_examUniCode].subscribedStudents;
        for(uint i = 0; i < subscribedStudent.length; ++i) { 
            if(subscribedStudent[i] == _studentBadgeNumber)
                return true;
        }
        return false;
    }

    function setUniCode(bytes10 _examUniCode) public onlyAdminContract {
        exams[_examUniCode].uniCode = _examUniCode;
    }

    function addNewSubscribedUser(bytes10 _examUniCode, uint32 _studentBadgeNumber) public onlyStudentContract {
        exams[_examUniCode].subscribedStudents.push(_studentBadgeNumber);
    }

    // set the student test result
    function setNewResult(bytes10 _examUniCode, uint32 _studentBadgeNumber, uint8 _result) public onlyTeacherContract {
        exams[_examUniCode].unconfirmedResults[_studentBadgeNumber] = _result;
    }

    // confirm student test result
    function setConfirmedResult(bytes10 _examUniCode, uint32 _studentBadgeNumber) public onlyStudentContract {
        exams[_examUniCode].confirmedResults[_studentBadgeNumber] = exams[_examUniCode].unconfirmedResults[_studentBadgeNumber];
    }

    function deleteExam(bytes10 _examUnicode) public onlyAdminContract {
        delete exams[_examUnicode];
    }
        
    function setIndex(bytes10 _examUniCode, uint16 _index) public {
        exams[_examUniCode].index = _index;
    }

    function getIndex(bytes10 _examUniCode) public view returns(uint16) {
        return(exams[_examUniCode].index);
    }

    function resetExam(bytes10 _examUniCode) public onlyAdminContract {
        delete exams[_examUniCode];
    }
}