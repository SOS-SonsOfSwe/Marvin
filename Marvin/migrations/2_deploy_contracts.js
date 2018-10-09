var UserData = artifacts.require("./UserData.sol");
var StudentData = artifacts.require("./StudentData.sol");
var UserLogic = artifacts.require("./UserLogic.sol");
var ExamData = artifacts.require("./ExamData.sol");
var ClassData = artifacts.require("./ClassData.sol");
var DegreeData = artifacts.require("./DegreeData.sol");
var Student = artifacts.require("./Student.sol");
var Teacher = artifacts.require("./Teacher.sol");
var Admin = artifacts.require("./Admin.sol");
var ContractManager = artifacts.require("./ContractManager.sol");

module.exports = function (deployer) {
  deployer.deploy(ContractManager).then(function () {
    return ContractManager.deployed().then(async function (instance) {
      await deployer.deploy(UserData, ContractManager.address).then(function () {
        instance.setUserDataContract(UserData.address);
      })
      await deployer.deploy(UserLogic, ContractManager.address).then(function () {
        instance.setUserLogicContract(UserLogic.address);
      })
      await deployer.deploy(ExamData, ContractManager.address).then(function () {
        instance.setExamContract(ExamData.address);
      })
      await deployer.deploy(ClassData, ContractManager.address).then(function () {
        instance.setClassContract(ClassData.address);
      })
      await deployer.deploy(DegreeData, ContractManager.address).then(function () {
        instance.setDegreeContract(DegreeData.address);
      })
      await deployer.deploy(StudentData, ContractManager.address).then(function () {
        instance.setStudentDataContract(StudentData.address);
      })
      await deployer.deploy(Student, ContractManager.address).then(function () {
        instance.setStudentContract(Student.address);
      })
      await deployer.deploy(Teacher, ContractManager.address).then(function () {
        instance.setTeacherContract(Teacher.address);
      })
      return deployer.deploy(Admin, ContractManager.address).then(function () {
        instance.setAdminContract(Admin.address);
      })
    })
  })
};