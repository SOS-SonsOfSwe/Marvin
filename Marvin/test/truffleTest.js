const AdminContract = artifacts.require('./Admin.sol')
const DegreeContract = artifacts.require('./DegreeData')
const ClassContract = artifacts.require('./ClassData')
const UserLogic = artifacts.require('./UserLogic')
const web3 = require('web3')

const address0 = '0x627306090abab3a6e1400e9345bc60c78a8bef57' // mainly university
const address1 = '0xf17f52151ebef6c7334fad080c5704d77216b732' // to use as admin
const address2 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef' // to use as admin
const address3 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544' // to use as admin
const address4 = '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2' // to use as teacher
const address5 = '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e' // to use as teacher
const address6 = '0x2191ef87e392377ec08e7c08eb105ef5448eced5' // to use as teacher
const address7 = '0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5' // to use as student
const address8 = '0x6330a553fc93768f612722bb8c2ec78ac90b3bbc' // to use as student
const address9 = '0x5aeda56215b167893e80b4fe645ba6d5bab767de' // to use as student

contract('Admin', (address) => {
  it('should add a new admin', function () {
    var adminInstance
    AdminContract.deployed()
      .then(instance => {
        adminInstance = instance
        return adminInstance.addUser('AAABBB00A00B000C', '1234567890', '1', { from: address[0] })
      })
      .then(() => {
        return adminInstance.getUserData({ from: address[0] })
      })
      .then(result => {
        assert.equal(web3.toUtf8(result[0][0]), 'AAABBB00A00B000C', "Checking fiscal code...");
        assert.equal(web3.toDecimal(result[2][0]), 1, "Checking badge number...");
        assert.equal(web3.toDecimal(result[3][0]), 1, "Adding new admin ok");
      })
  });
})

contract('Admin, UserLogic', (address) => {
  it('should check for a newly added admin', function () {
    AdminContract.deployed()
      .then(adminInstance => {
        return adminInstance.addUser('AAABBB00A00B000C', '1234567890', '1', { from: address[0] })
      });
    UserLogic.deployed()
      .then(logicInstance => {
        return logicInstance.checkInsertUser('AAABBB00A00B000C', '1234567890', { from: address[0] })
      })
      .then(isTrue => {
        assert.equal(isTrue, true, "Error checking for new users");
      })
  })
})

contract('Admin, DegreeData', (address) => {
  it('should add a new year', () => {
    AdminContract.deployed()
      .then(adminInstance => {
        return adminInstance.addNewYear(2017, { from: address[0] })
      });
    DegreeContract.deployed()
      .then(degreeInstance => {
        return degreeInstance.getAcademicYears({ from: address[0] })
      })
      .then(result => {
        assert.equal(parseInt(result[0].slice(2, -5), 16), 2017, 'Error adding a new year: ')
      })
  });

  it("should check for a newly added year", function () {
    var instance
    AdminContract.deployed()
      .then(adminInstance => {
        instance = adminInstance
        return instance.addNewYear(2018, { from: address[0] })
      });
    DegreeContract.deployed()
      .then(degreeInstance => {
        return degreeInstance.isYear(2018, { from: address[0] })
      })
      .then(isTrue => {
        assert.equal(isTrue, true, "Adding new year... ");
      })
  });
  it("should check for a newly added degree", function () {
    var instance
    AdminContract.deployed()
      .then(adminInstance => {
        instance = adminInstance
        return instance.addNewDegree('INF18', 2018, 'asdasdasd', { from: address[0] })
      });
    DegreeContract.deployed()
      .then(degreeInstance => {
        return degreeInstance.isDegree('INF18', { from: address[0] })
      })
      .then(isTrue => {
        assert.equal(isTrue, true, "Adding new degree... ");
      })
  });
})

// contract('Admin, ClassData', (address) => {
//   it("should check for a newly added class", function () {
//     var instance
//     AdminContract.deployed()
//       .then(adminInstance => {
//         instance = adminInstance
//         return instance.addNewClass('INF18', 'PROGR18', 'asdasdasd', { from: address[0] })
//       });
//     ClassContract.deployed()
//       .then(classInstance => {
//         return classInstance.isClass('PROGR18', { from: address[0] })
//       })
//       .then(isTrue => {
//         assert.equal(isTrue, true, "Adding new class... ");
//       })
//   });
// })