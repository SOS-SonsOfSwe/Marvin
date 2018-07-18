pragma solidity ^0.4.2;
import "./ClassData.sol";
import "./ContractManager.sol";

contract DegreeData {
    address uniAddress;
    ContractManager manager;

    struct Degree {
        uint8 yearIndex;
        uint16 index;
        bytes10 uniCode;
        bytes32 hashData;
        bytes10[] classes;
    }

    // all degrees of all years are mapped: key = uniCode, value = Degree
    mapping (bytes10 => Degree) degrees;

    // every class of all years: key = year, value = Degrees uniCodes of all the degrees for that year
    mapping (bytes4 => bytes10[]) yearDegrees;

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

    // return all the degrees unicodes and their IPFS hash of to the year
    function getYearDegreesData(bytes4 _year) public view returns(bytes32[], bytes10[]) {
        bytes10[] memory degreesForYear = yearDegrees[_year];
        bytes32[] memory degreesHashCodes = new bytes32[](degreesForYear.length);
        for(uint i = 0; i < degreesForYear.length; ++i) {
            degreesHashCodes[i] = degrees[degreesForYear[i]].hashData;
        }
        return(degreesHashCodes, degreesForYear);
    }

    // return all the classes unicodes of the degree
    function getClasses(bytes10 _degreeUniCode) public view returns(bytes10[]) {
        return(degrees[_degreeUniCode].classes);
    }

    // return all the classes unicodes and their IPFS hash of the degree
    function getClassesData(bytes10 _degreeUniCode) public view returns(bytes32[], uint32[], bytes10[]) {
        bytes10[] memory classesForDegree = getClasses(_degreeUniCode);
        bytes32[] memory classesHashCodes = new bytes32[](classesForDegree.length);
        uint32[] memory classesTeacher = new uint32[](classesForDegree.length);
        for(uint i = 0; i < classesForDegree.length; ++i) {
            classesHashCodes[i] = ClassData(manager.getClassContract()).getHashData(classesForDegree[i]);
            classesTeacher[i] = ClassData(manager.getClassContract()).getClassTeacher(classesForDegree[i]);
        }
        return(classesHashCodes, classesTeacher, classesForDegree);
    }

    function setHashData(bytes10 _degreeUniCode, bytes32 _degreeHashData) public onlyAdminContract {
        degrees[_degreeUniCode].hashData = _degreeHashData;
    }

    function addYear(bytes4 _year) public onlyAdminContract {
        academicYears.push(_year);
    }

    // add a new degree in the academic year
    function addYearDegree(bytes10 _degreeUniCode, bytes4 _year) public onlyAdminContract {
        degrees[_degreeUniCode].uniCode = _degreeUniCode;
        degrees[_degreeUniCode].yearIndex = uint8(yearDegrees[_year].push(_degreeUniCode) - 1);
        degrees[_degreeUniCode].index = uint16(uniCodes.push(_degreeUniCode) - 1);
    }

    // add a new class into degree
    function addNewClass(bytes10 _degreeUniCode, bytes10 _classUniCode) public onlyAdminContract returns(uint16){
        return(uint16(degrees[_degreeUniCode].classes.push(_classUniCode) - 1));
    }

    function deleteDegree(bytes10 _degreeUniCode, bytes4 _degreeYear) public onlyAdminContract {
        require((degrees[_degreeUniCode].classes).length == 0);
        uint16 dIndex = degrees[_degreeUniCode].index;
        uint8 dYearIndex = degrees[_degreeUniCode].yearIndex;
        bytes10[] memory dYear = yearDegrees[_degreeYear];
        uniCodes[dIndex] = uniCodes[uniCodes.length-1];
        degrees[uniCodes[dIndex]].index = dIndex;
        uniCodes.length--;
        yearDegrees[_degreeYear][dYearIndex] = yearDegrees[_degreeYear][dYear.length-1];
        degrees[yearDegrees[_degreeYear][dYearIndex]].yearIndex = dYearIndex;
        yearDegrees[_degreeYear].length--;
        // Needed for the insert of new degrees with the same degreeUniCode as a deleted degree
        delete degrees[_degreeUniCode];
    }

    function deleteClass(bytes10 _degreeUniCode, uint16 _classIndex) public onlyAdminContract {
        ClassData class = ClassData(manager.getClassContract());
        bytes10 oldClassUnicode = degrees[_degreeUniCode].classes[_classIndex];
        require((class.getClassExams(oldClassUnicode)).length == 0);
        uint16 lastClassIndex = uint16((degrees[_degreeUniCode].classes).length - 1);
        degrees[_degreeUniCode].classes[_classIndex] = degrees[_degreeUniCode].classes[lastClassIndex];
        bytes10 newClassUnicode = degrees[_degreeUniCode].classes[_classIndex];
        class.setIndex(newClassUnicode, _classIndex);
        (degrees[_degreeUniCode].classes).length--;
    }

    function deleteYear(bytes4 _year) public onlyAdminContract {
        require(yearDegrees[_year].length == 0);
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