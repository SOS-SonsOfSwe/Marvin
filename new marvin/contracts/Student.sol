pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ExamData.sol";
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

    function booklet() public view returns(bytes32[], uint8[]) {
        uint32 badgeNumber = UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender);
        // array contenente gli uniCode degli esami confermati per lo studente chiamante
        bytes10[] memory confirmedExamsUniCode = StudentData(manager.getStudentDataContract()).getConfirmedExamsPerStudent(badgeNumber);
        bytes32[] memory examsHashData = new bytes32[](confirmedExamsUniCode.length);
        uint8[] memory examsResult = new uint8[](confirmedExamsUniCode.length);
        ExamData exam = ExamData(manager.getExamContract());
        for(uint i = 0; i < confirmedExamsUniCode.length; ++i) {
            examsHashData[i] = exam.getHashData(confirmedExamsUniCode[i]);
            examsResult[i] = exam.getConfirmedResult(badgeNumber, confirmedExamsUniCode[i]);
        }
        return(examsHashData, examsResult);
    }

    function confirmResult(bytes10 _examUniCode) public {
        uint32 badgeNumber = UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender);
        ExamData exam = ExamData(manager.getExamContract());
        require(exam.isExam(_examUniCode) && exam.isStudentSubscribed(_examUniCode, badgeNumber));
        exam.setConfirmedResult(_examUniCode, badgeNumber);
        StudentData(manager.getStudentDataContract()).addAcceptedResult(_examUniCode, badgeNumber);
    }

    function subscribeExam(bytes10 _examUniCode) public {
        ExamData exam = ExamData(manager.getExamContract());
        require(exam.isExam(_examUniCode) && (exam.getExamActiveSubscription(_examUniCode) == true));
        uint32 badgeNumber = UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender);
        exam.addNewSubscribedUser(_examUniCode, badgeNumber);
        StudentData(manager.getStudentDataContract()).addSubscribedExam(_examUniCode, badgeNumber);
    }
}