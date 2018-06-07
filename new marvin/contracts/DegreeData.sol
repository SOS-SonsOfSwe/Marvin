pragma solidity ^0.4.2;
import "./CourseData.sol";

contract DegreeData {
    CourseData course;
    struct Degree {
        bytes10 uniCode;
        bytes32 hashData;
        // codici univoci delle attività didattiche di un CDL
        bytes10[] courses;
    }

    constructor(address _courseContractAddress) public {
        course = CourseData(_courseContractAddress);
    }

    // mapping of degrees (all degrees of all years are mapped): key = uniCode, value = Degree
    mapping (bytes10 => Degree) degrees;

    // mapping of every course of all years: key = year, value = Degrees uniCodes of all the degrees for that year
    mapping (bytes4 => bytes10[]) yearDegrees;

    // unicodes of all degrees of all years
    bytes10[] uniCodes;

    // registered years
    bytes4[] academicYears;

    function isYear(bytes4 _year) public view returns(bool) {
        for(uint i = 0; i < academicYears.length; ++i) {
            if(academicYears[i] == _year)
                return true;
        }
        return false;
    }

    function isDegree(bytes10 _degreeUniCode) public view returns(bool) {
        // check if this uniCode is already assigned
        if(degrees[_degreeUniCode].uniCode == 0) 
            return false;
        return true;
    }

    function isDegreeCourse(bytes10 _degreeUniCode, bytes10 _courseUniCode) public view returns(bool) {
        bytes10[] memory degreeCourses = degrees[_degreeUniCode].courses;
        for(uint i = 0; i < degreeCourses.length; ++i) {
            if(degreeCourses[i] == _courseUniCode)
                return true;
        }
        return false;
    }

    function getAcademicYears() public view returns(bytes4[]) {
        return(academicYears);
    }

    // this function should be accessible only by university or admins
    function getAllIdentifiers() public view returns(bytes10[]) {
        return uniCodes;
    }

    function getYearDegrees(bytes4 _year) public view returns(bytes10[]) {
        return(yearDegrees[_year]);
    }

    function getYearDegreesData(bytes4 _year) public view returns(bytes10[], bytes32[]) {
        bytes10[] memory degreesForYear = getYearDegrees(_year);
        bytes32[] memory degreesHashCodes;
        for(uint i = 0; i < degreesForYear.length; ++i) {
            degreesHashCodes[i] = degrees[degreesForYear[i]].hashData;
        }
        return(degreesForYear, degreesHashCodes);
    }

    function getDegreeCourses(bytes10 _degreeUniCode) public view returns(bytes10[]) {
        return(degrees[_degreeUniCode].courses);
    }

    function getDegreeCoursesData(bytes10 _degreeUniCode) public view returns(bytes10[], bytes32[]) {
        bytes10[] memory coursesForDegree = getDegreeCourses(_degreeUniCode);
        bytes32[] memory coursesHashCodes;
        for(uint i = 0; i < coursesForDegree.length; ++i) {
            coursesHashCodes[i] = degrees[coursesForDegree[i]].hashData;
        }
        return(coursesForDegree, coursesHashCodes);
    }

    function setHashData(bytes10 _degreeUniCode, bytes32 _degreeHashData) public {
        degrees[_degreeUniCode].hashData = _degreeHashData;
    }

    function addYear(bytes4 _year) public {
        academicYears.push(_year);
    }

    function addYearDegree(bytes10 _degreeUniCode, bytes4 _year) public {
        yearDegrees[_year].push(_degreeUniCode);
        uniCodes.push(_degreeUniCode);
        degrees[_degreeUniCode].uniCode = _degreeUniCode;
    }

    function addDegreeCourse(bytes10 _degreeUniCode, bytes10 _courseUniCode) public {
        degrees[_degreeUniCode].courses.push(_courseUniCode);
    }
}