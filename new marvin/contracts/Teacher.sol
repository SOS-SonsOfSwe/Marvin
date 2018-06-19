pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ExamData.sol";
import "./ContractManager.sol";

contract Teacher {
    address uniAddress;
    ContractManager manager;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    // permesso solo se il chiamante è il professoreassociato all'esame identificato da _uniCode
    modifier onlyAuthorizedExamTeacher(bytes10 _examUniCode) {
        require(ExamData(manager.getExamContract()).getExamTeacher(_examUniCode) == UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender));
        _;
    }

    // students subscribed to the exam
    function examSubscribedStudent(bytes10 _examUniCode) public view returns(uint32[]){
        ExamData exam = ExamData(manager.getExamContract());
        return(exam.getExamSubscribedStudent(_examUniCode));
    }

    function myExams() public view returns(bytes32[]) {
        ExamData exam = ExamData(manager.getExamContract());
        UserData user = UserData(manager.getUserDataContract());
        uint32 badgeNumber = user.getRegUsersBadgeNumber(msg.sender);
        // array degli uniCode degli esami associati al professorechiamante
        bytes10[] memory examsUniCode = exam.getTeacherExams(badgeNumber);
        bytes32[] memory examsHashData = new bytes32[](examsUniCode.length);
        for(uint i = 0; i < examsUniCode.length; ++i) {
            examsHashData[i] = exam.getHashData(examsUniCode[i]);
        }
        return examsHashData;
    }

    function registerResult(bytes10 _examUniCode, uint32 _studentBadgeNumber, uint8 _result) public onlyAuthorizedExamTeacher(_examUniCode) {
        ExamData exam = ExamData(manager.getExamContract());
        require(exam.isExam(_examUniCode) && exam.isStudentSubscribed(_examUniCode, _studentBadgeNumber));
        exam.setNewResult(_examUniCode, _studentBadgeNumber, _result);
    }
}