pragma solidity ^0.4.2;
import "./UserData.sol";
import "./DegreeData.sol";

contract Admin {
    ExamData exam;
    DegreeData degree;
    CourseData course;
    UserData user;

    constructor(address _userContract, address _examContract, address _courseContract, address _degreeContract) public {
        user = UserData(_userContract);
        exam = ExamData(_examContract);
        course = CourseData(_courseContract);
        degree = DegreeData(_degreeContract);
    }

    function addUser(bytes32 _fiscalCode, bytes10 _uniCode, uint8 _userType) public {  
        require((user.getUsersUniCode(_fiscalCode) == 0), "Fiscal code already assigned");
        user.setUniCode(_fiscalCode, _uniCode);
        user.setUserType(_fiscalCode, _userType);
        user.setEtherWithdraw(_fiscalCode, true);
        user.addAndSetBadgeNumber(_fiscalCode);
    }

    function addNewYear(bytes4 _year) public {
        if(!degree.isYear(_year))
            degree.addYear(_year);
    }

    function addNewDegree(bytes10 _degreeUniCode, bytes4 _year, bytes32 _hashData) public {
        if(!degree.isYear(_year))
            degree.addYear(_year);
        require(!degree.isDegree(_degreeUniCode));
        degree.addYearDegree(_degreeUniCode, _year);
        degree.setHashData(_degreeUniCode, _hashData);
    }

    function addNewCourse(bytes10 _degreeuniCode, bytes10 _courseUniCode, bytes32 _courseHashData) public {
        require(!degree.isDegreeCourse(_degreeuniCode, _courseUniCode));
        degree.addDegreeCourse(_degreeuniCode, _courseUniCode);
        course.addNewCourse(_courseUniCode);
        course.setUniCode(_courseUniCode);
        course.setHashData(_courseUniCode, _courseHashData);
    }

    function addNewExam(bytes10 _courseUniCode, bytes10 _examUniCode, uint32 _examTeacher, bytes32 _examHashData) public {
        course.addNewExam(_courseUniCode, _examUniCode);
        exam.addNewExam(_examUniCode);
        exam.setExamTeacher(_examUniCode, _examTeacher);
        exam.setHashData(_examUniCode, _examHashData);
        exam.setActiveSubscription(_examUniCode, true);
    }

    function setExamTeacher(bytes10 _examUniCode, uint32 _teacherBadgeNumber) public {
        exam.setExamTeacher(_examUniCode, _teacherBadgeNumber);
    }
}