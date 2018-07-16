pragma solidity ^0.4.2;
import "./ExamData.sol";
import "./ContractManager.sol";
import "./UserData.sol";

contract ClassData {
    address uniAddress;
    ContractManager manager;

    struct Class {
        uint16 index;
        uint32 classTeacher;
        bytes10 uniCode;
        bytes32 hashData;
        // exams unicodes of the class
        bytes10[] classExams;
        // students result (accepted)
        mapping (uint32 => uint8) confirmedResults;
    }

    // key = class unicode, value = Class
    mapping (bytes10 => Class) classes;
        
    /* Teacher assigned classes
     * key = teacher badgeNumber, value = uniCodes of assigned classes */
    mapping(uint32 => bytes10[]) classTeacher;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    modifier onlyAdminContract() {
        require(msg.sender == manager.getAdminContract());
        _;
    }

    function isClass(bytes10 _classUniCode) public view returns(bool) {
        if(classes[_classUniCode].uniCode == 0)
            return false;
        return true;
    }

    function getHashData(bytes10 _classUniCode) public view returns(bytes32) {
        return (classes[_classUniCode].hashData);
    }

    function getClassExams(bytes10 _classUniCode) public view returns(bytes10[]) {
        return (classes[_classUniCode].classExams);
    }

    // return all the class exams and their IPFS hashes
    function getClassExamsData(bytes10 _classUniCode) public view returns(bytes32[], uint32, bytes10[]) {
        bytes10[] memory examsForClass = classes[_classUniCode].classExams;
        bytes32[] memory examsHashCodes = new bytes32[](examsForClass.length);
        uint32 examsTeacher = classes[_classUniCode].classTeacher;
        for(uint i = 0; i < examsForClass.length; ++i) {
            examsHashCodes[i] = ExamData(manager.getExamContract()).getHashData(examsForClass[i]);
        }
        return(examsHashCodes, examsTeacher, examsForClass);
    }

    function setUniCode(bytes10 _classUniCode) public onlyAdminContract {
        classes[_classUniCode].uniCode = _classUniCode;
    }

    function setHashData(bytes10 _classUniCode, bytes32 _classHashData) public onlyAdminContract {
        classes[_classUniCode].hashData = _classHashData;
    }

    function addNewExam(bytes10 _classUniCode, bytes10 _examUniCode) public onlyAdminContract returns(uint16) {
        return(uint16(classes[_classUniCode].classExams.push(_examUniCode) - 1));
    }

    function deleteExam(bytes10 _classUniCode, uint16 _examIndex) public onlyAdminContract {
        ExamData exam = ExamData(manager.getExamContract());
        bytes10 oldExamUnicode = classes[_classUniCode].classExams[_examIndex];
        require((exam.getExamSubscribedStudent(oldExamUnicode)).length == 0);
        uint16 lastExamIndex = uint16((classes[_classUniCode].classExams).length - 1);
        classes[_classUniCode].classExams[_examIndex] = classes[_classUniCode].classExams[lastExamIndex];
        bytes10 newExamUnicode = classes[_classUniCode].classExams[_examIndex];
        exam.setIndex(newExamUnicode, _examIndex);
        (classes[_classUniCode].classExams).length--;
    }

    function resetClass(bytes10 _classUniCode) public onlyAdminContract {
        delete classes[_classUniCode];
    }

    function setIndex(bytes10 _classUniCode, uint16 _index) public {
        classes[_classUniCode].index = _index;
    }

    function getIndex(bytes10 _classUniCode) public view returns(uint16) {
        return(classes[_classUniCode].index);
    }

    // set the associated class teacher
    function setClassTeacher(bytes10 _classUniCode, uint32 _teacherBadgeNumber) public onlyAdminContract {
        classes[_classUniCode].classTeacher = _teacherBadgeNumber;
        classTeacher[_teacherBadgeNumber].push(_classUniCode);
    }

    // return class teacher
    function getClassTeacher(bytes10 _classUniCode) public view returns(uint32) {
        return(classes[_classUniCode].classTeacher);
    }

    function getTeacherClasses(uint32 _badgeNumber) public view returns(bytes10[]) {
        return(classTeacher[_badgeNumber]);
    }

    // return accepted student result
    function getConfirmedResult(uint32 _studentBadgeNumber, bytes10 _classUniCode) public view returns(uint8) {
        return(classes[_classUniCode].confirmedResults[_studentBadgeNumber]);
    }

    // confirm student test result
    function setConfirmedResult(bytes10 _classUniCode, uint32 _studentBadgeNumber, uint8 _result) public {
        classes[_classUniCode].confirmedResults[_studentBadgeNumber] = _result;
    }
}