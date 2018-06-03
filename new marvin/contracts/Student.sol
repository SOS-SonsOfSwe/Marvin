pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ExamData.sol";

contract Student {
    ExamData exam;
    UserData user;

    constructor(address _userContract, address _examContract) public {
        user = UserData(_userContract);
        exam = ExamData(_examContract);
    }

    // da spostare in DegreeData?
    // mapping that save the degree course associated with a student: key = student address, value = degree uniCode
    mapping (address => bytes10) degreeCourseStudents;

    // da spostare in DegreeData?
    function setDegree(address _studentAddress, bytes10 _degree) public {
        degreeCourseStudents[_studentAddress] = _degree;
    }     

    /* libretto dello studente, ritorno l'array degli hashData degli esami accettati e 
     * l'array dei relativi voti */

    // un'alternativca è iterare sugli array nel frontend e poi richiedere i dati ai contracts
    function booklet() public view returns(bytes32[], bytes2[]) {
        uint32 badgeNumber = user.getRegUsersBadgeNumber(msg.sender);
        // array contenente gli uniCode degli esami confermati per lo studente chiamante
        bytes10[] memory confirmedExamsUniCode = exam.getConfirmedExamsPerStudent(badgeNumber);
        bytes32[] memory examsHashData = new bytes32[](confirmedExamsUniCode.length);
        bytes2[] memory examsResult = new bytes2[](confirmedExamsUniCode.length);
        for(uint i = 0; i < confirmedExamsUniCode.length; ++i) {
            examsHashData[i] = exam.getHashData(confirmedExamsUniCode[i]);
            examsResult[i] = exam.getConfirmedResult(badgeNumber, confirmedExamsUniCode[i]);
        }
        return(examsHashData, examsResult);
    }

    function confirmResult(bytes10 _examUniCode) public {
        uint32 badgeNumber = user.getRegUsersBadgeNumber(msg.sender);
        exam.setConfirmedResult(_examUniCode, badgeNumber);
    }

    function subscribeExam(bytes10 _examUniCode) public {
        uint32 badgeNumber = user.getRegUsersBadgeNumber(msg.sender);
        exam.addNewSubscribedUser(_examUniCode, badgeNumber);
    }
}