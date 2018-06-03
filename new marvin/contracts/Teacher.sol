pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ExamData.sol";

contract Teacher {
    ExamData exam;
    UserData user;

    constructor(address _userContract, address _examContract) public {
        user = UserData(_userContract);
        exam = ExamData(_examContract);
    }

    // permesso solo se il chiamante è il professore associato all'esame identificato da _uniCode
    modifier onlyAuthorizedExamTeacher(bytes10 _examUniCode) {
        require(exam.getExamTeacher(_examUniCode) == user.getRegUsersBadgeNumber(msg.sender));
        _;
    }

    // dato il codice univoco dell'esame, restituisce gli studenti che si sono iscritti
    function examSubscribedStudent(bytes10 _examUniCode) public view returns(uint32[]){
        return(exam.getExamSubscribedStudent(_examUniCode));
    }

    // ritorna l'hashData degli esami associati al professore
    function myExams() public view returns(bytes32[]) {
        uint32 badgeNumber = user.getRegUsersBadgeNumber(msg.sender);
        // array degli uniCode degli esami associati al professore chiamante
        bytes10[] memory examsUniCode = exam.getTeacherExams(badgeNumber);
        bytes32[] memory examsHashData = new bytes32[](examsUniCode.length);
        for(uint i = 0; i < examsUniCode.length; ++i) {
            examsHashData[i] = exam.getHashData(examsUniCode[i]);
        }
        return examsHashData;
    }

    function registerResult(bytes10 _examUniCode, uint32 _studentBadgeNumber, bytes2 _result) public {
        exam.setNewResult(_examUniCode, _studentBadgeNumber, _result);
    }
}