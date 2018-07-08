pragma solidity ^0.4.2;
import "./ExamData.sol";
import "./ContractManager.sol";
import "./UserData.sol";

contract ClassData {
    address uniAddress;
    ContractManager manager;

    struct Class {
        uint16 index;
        bytes10 uniCode;
        bytes32 hashData;
        // exams unicodes of the class
        bytes10[] classExams;
    }

    // key = class unicode, value = Class
    mapping (bytes10 => Class) classes;

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
    
    function getNumberClassExams(bytes10 _classUniCode) public view returns(uint) {
        return ((classes[_classUniCode].classExams).length);
    }

    function getClassExams(bytes10 _classUniCode) public view returns(bytes10[]) {
        return (classes[_classUniCode].classExams);
    }

    // return all the class exams and their IPFS hashes
    function getClassExamsData(bytes10 _classUniCode) public view returns(bytes32[], bytes10[]) {
        bytes10[] memory examsForClass = classes[_classUniCode].classExams;
        bytes32[] memory examsHashCodes = new bytes32[](examsForClass.length);
        for(uint i = 0; i < examsForClass.length; ++i) {
            examsHashCodes[i] = ExamData(manager.getExamContract()).getHashData(examsForClass[i]);
        }
        return(examsHashCodes, examsForClass);
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
        uint16 lastExamIndex = uint16((classes[_classUniCode].classExams).length - 1);
        classes[_classUniCode].classExams[_examIndex] = classes[_classUniCode].classExams[lastExamIndex];
        bytes10 newExamUnicode = classes[_classUniCode].classExams[_examIndex];
        ExamData(manager.getExamContract()).setIndex(newExamUnicode, _examIndex);
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
}