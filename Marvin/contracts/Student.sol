pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ExamData.sol";
import "./ClassData.sol";
import "./StudentData.sol";
import "./ContractManager.sol";

/*
 * Functions in this contract don't require any modifier because there is an implicit  
 * check of the invoker identity in the body of the functions
 */

contract Student {
    address uniAddress;
    ContractManager manager;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    function booklet() public view returns(bytes32[], uint8[], bytes10[]) {
        uint32 badgeNumber = UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender);
        // array contenente gli uniCode degli esami confermati per lo studente chiamante
        bytes10[] memory acceptedClassUniCode = StudentData(manager.getStudentDataContract()).getAcceptedResults(badgeNumber);
        bytes32[] memory classHashData = new bytes32[](acceptedClassUniCode.length);
        uint8[] memory classResult = new uint8[](acceptedClassUniCode.length);
        ClassData class = ClassData(manager.getClassContract());
        for(uint i = 0; i < acceptedClassUniCode.length; ++i) {
            classHashData[i] = class.getHashData(acceptedClassUniCode[i]);
            classResult[i] = class.getConfirmedResult(badgeNumber, acceptedClassUniCode[i]);
        }
        return(classHashData, classResult, acceptedClassUniCode);
    }

    function confirmResult(bytes10 _examUniCode, bytes10 _classUniCode, uint8 _result) public {
        uint32 badgeNumber = UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender);
        ExamData exam = ExamData(manager.getExamContract());
        require(exam.isExam(_examUniCode) && exam.isStudentSubscribed(_examUniCode, badgeNumber) && (_result >= 18));
        ClassData(manager.getClassContract()).setConfirmedResult(_classUniCode, badgeNumber, _result);
        StudentData(manager.getStudentDataContract()).addAcceptedResult(_classUniCode, badgeNumber);
    }

    function subscribeExam(bytes10 _examUniCode) public {
        ExamData exam = ExamData(manager.getExamContract());
        require(exam.isExam(_examUniCode));
        uint32 badgeNumber = UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender);
        exam.addNewSubscribedUser(_examUniCode, badgeNumber);
        StudentData(manager.getStudentDataContract()).addSubscribedExam(_examUniCode, badgeNumber);
    }
}