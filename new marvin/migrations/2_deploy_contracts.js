var UserData = artifacts.require("./UserData.sol");
var UserLogic = artifacts.require("./UserLogic.sol");
var ExamData = artifacts.require("./ExamData.sol");
var CourseData = artifacts.require("./CourseData.sol");
var DegreeData = artifacts.require("./DegreeData.sol");
var Student = artifacts.require("./Student.sol");
var Teacher = artifacts.require("./Teacher.sol");
var Admin = artifacts.require("./Admin.sol");

module.exports = function (deployer) {
  deployer.deploy(UserData)
    .then(function () {
      deployer.deploy(UserLogic, UserData.address);
      return deployer.deploy(ExamData);
    })
    .then(function () {
      deployer.deploy(Student, UserData.address, ExamData.address);
      deployer.deploy(Teacher, UserData.address, ExamData.address);
      return deployer.deploy(CourseData, ExamData.address);
    })
    .then(function () {
      return deployer.deploy(DegreeData, CourseData.address);
    })
    .then(function () {
      return deployer.deploy(Admin, UserData.address, ExamData.address, CourseData.address, DegreeData.address);
    });
};