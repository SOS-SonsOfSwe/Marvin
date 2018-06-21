pragma solidity ^0.4.2;
import "./CourseData.sol";
import "./ContractManager.sol";

contract DegreeData {
    address uniAddress;
    ContractManager manager;

    struct Degree {
        uint16 index;
        bytes10 uniCode;
        bytes32 hashData;
        // codici univoci delle attività didattiche di un CDL
        bytes10[] courses;
    }

    // all degrees of all years are mapped: key = uniCode, value = Degree
    mapping (bytes10 => Degree) degrees;

    // every course of all years: key = year, value = Degrees uniCodes of all the degrees for that year
    mapping (bytes4 => bytes10[]) yearDegrees;

    // student's degree: key = student address, value = Degree uniCode
    mapping (address => bytes10) degreeCourseStudents;

    // unicodes of all degrees of all years
    bytes10[] uniCodes;

    // registered academic years
    bytes4[] academicYears;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    modifier onlyAdminContract() {
        require(msg.sender == manager.getAdminContract());
        _;
    }

    // return true only if the year has already been registered
    function isYear(bytes4 _year) public view returns(bool) {
        for(uint i = 0; i < academicYears.length; ++i) {
            if(academicYears[i] == _year)
                return true;
        }
        return false;
    }

    // return true only if the degree has already been registered
    function isDegree(bytes10 _degreeUniCode) public view returns(bool) {
        // check if this uniCode is already assigned
        if(degrees[_degreeUniCode].uniCode == 0) 
            return false;
        return true;
    }

    function getAcademicYears() public view returns(bytes4[]) {
        return(academicYears);
    }

    function getAllIdentifiers() public view returns(bytes10[]) {
        return uniCodes;
    }

    // return all the degrees unicodes of the year
    function getYearDegrees(bytes4 _year) public view returns(bytes10[]) {
        return(yearDegrees[_year]);
    }

    // return all the degrees unicodes and their IPFS hash of to the year
    function getYearDegreesData(bytes4 _year) public view returns(bytes32[], bytes10[]) {
        bytes10[] memory degreesForYear = getYearDegrees(_year);
        bytes32[] memory degreesHashCodes = new bytes32[](degreesForYear.length);
        for(uint i = 0; i < degreesForYear.length; ++i) {
            degreesHashCodes[i] = degrees[degreesForYear[i]].hashData;
        }
        return(degreesHashCodes, degreesForYear);
    }

    // return all the courses unicodes of the degree
    function getCourses(bytes10 _degreeUniCode) public view returns(bytes10[]) {
        return(degrees[_degreeUniCode].courses);
    }

    // return all the courses unicodes and their IPFS hash of the degree
    function getCoursesData(bytes10 _degreeUniCode) public view returns(bytes32[], bytes10[]) {
        bytes10[] memory coursesForDegree = getCourses(_degreeUniCode);
        bytes32[] memory coursesHashCodes = new bytes32[](coursesForDegree.length);
        for(uint i = 0; i < coursesForDegree.length; ++i) {
            coursesHashCodes[i] = CourseData(manager.getCourseContract()).getHashData(coursesForDegree[i]);
        }
        return(coursesHashCodes, coursesForDegree);
    }

    function setHashData(bytes10 _degreeUniCode, bytes32 _degreeHashData) public onlyAdminContract {
        degrees[_degreeUniCode].hashData = _degreeHashData;
    }

    // ?? Admin o Student
    function setDegree(address _studentAddress, bytes10 _degree) public {
        degreeCourseStudents[_studentAddress] = _degree;
    }  

    function addYear(bytes4 _year) public onlyAdminContract {
        academicYears.push(_year);
    }

    // add a new degree in the academic year
    function addYearDegree(bytes10 _degreeUniCode, bytes4 _year) public onlyAdminContract {
        yearDegrees[_year].push(_degreeUniCode);
        degrees[_degreeUniCode].uniCode = _degreeUniCode;
        degrees[_degreeUniCode].index = uint16(uniCodes.push(_degreeUniCode) - 1);
    }

    // add a new course into degree
    function addCourse(bytes10 _degreeUniCode, bytes10 _courseUniCode) public onlyAdminContract {
        degrees[_degreeUniCode].courses.push(_courseUniCode);
    }

    function deleteDegree(bytes10 _degreeUniCode, bytes4 _degreeYear) public onlyAdminContract {
        uint16 dIndex = degrees[_degreeUniCode].index;
        bytes10[] memory dYear = yearDegrees[_degreeYear];
        bool found = false;
        uniCodes[dIndex] = uniCodes[uniCodes.length-1];
        degrees[uniCodes[dIndex]].index = dIndex;
        uniCodes.length--;
        for(uint i = 0; i < dYear.length && !found; ++i) {
            if(dYear[i] == _degreeUniCode) {
                yearDegrees[_degreeYear][i] = yearDegrees[_degreeYear][dYear.length-1];
                yearDegrees[_degreeYear].length--;
            }  
        }
        delete degrees[_degreeUniCode];
    }

    function deleteYear(bytes4 _year) public onlyAdminContract {
        bool found = false;
        for(uint i = 0; i < academicYears.length && !found; ++i) {
            if(academicYears[i] == _year) {
                academicYears[i] = academicYears[academicYears.length-1];
                academicYears.length--;
                found = true;
            }
        }
    }
}