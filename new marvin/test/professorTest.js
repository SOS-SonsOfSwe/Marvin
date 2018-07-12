const AdminContract = artifacts.require('./Admin.sol')
const DegreeContract = artifacts.require('./DegreeData.sol')
const CourseContract = artifacts.require('./CourseData.sol')
const ExamContract = artifacts.require('./ExamData.sol')
const UserLogic = artifacts.require('./UserLogic.sol')
const UserData = artifacts.require('./UserData.sol')
const UserContract = artifacts.require('./Teacher.sol')


contract('Admin, Teacher', (address) => {
/*
    it("Should check for a newly added teacher", function() {
        AdminContract.deployed()
          .then( adminInstance => {
            return adminInstance.addUser('GLBFE14A01A001L', '1234567890', '2', { from: address[0] });
          })
          .then( adminInstance => {
            return adminInstance.getUserData({from: address[0]});
          })
          .then(result => {
            assert.equal(web3.toUtf8(result[0][0]), 'GLBFE14A01A001L', "Checking fiscal code...");
            assert.equal(web3.toDecimal(result[2][0]), 1, "Checking for the badge number...");
            assert.equal(web3.toDecimal(result[3][0]), 1, "Adding the new teacher: ok");
          })
    });
*/
})