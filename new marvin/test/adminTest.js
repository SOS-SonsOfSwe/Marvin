const AdminContract = artifacts.require('./Admin.sol')
const DegreeContract = artifacts.require('./DegreeData.sol')
const CourseContract = artifacts.require('./CourseData.sol')
const ExamContract = artifacts.require('./ExamData.sol')
const UserLogic = artifacts.require('./UserLogic.sol')
const UserData = artifacts.require('./UserData.sol')

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

contract('Admin, UserData', (address) => {
  let adminInstance, userDataInstance;
  AdminContract.deployed().then((inst) => { adminInstance = inst; });
  UserData.deployed().then((inst) => { userDataInstance = inst});

  it('should add a new admin', async () => {
    await adminInstance.addUser('AAABBB00A00B000C', '1234567890', '1', { from: address[0] });
    const result = adminInstance.getUserData({ from: address[0] });
    /*assert.equal(web3.toUtf8(result[0][0]), 'AAABBB00A00B000C', "Checking fiscal code...");
    assert.equal(web3.toDecimal(result[2][0]), 1, "Checking badge number...");
    assert.equal(web3.toDecimal(result[3][0]), 1, "Adding new admin ok");*/
  });
  
  /*it('should add a new admin', function () {
    AdminContract.deployed()
      .then(function(adminInstance) {
        adminInstance.addUser('AAABBB00A00B000C', '1234567890', 1, { from: address[0] })
        .then(function() {
          return adminInstance.getUserData({ from: address[0] });
        })
        .then(result => {
          assert.equal(web3.toUtf8(result[0][0]), 'AAABBB00A00B000C', "Checking fiscal code...");
          assert.equal(web3.toDecimal(result[2][0]), 1, "Checking badge number...");
          assert.equal(web3.toDecimal(result[3][0]), 1, "Adding new admin ok");
        })
      })
      /*
      adminInstance.getUserData({ from: address[0] });
      })
      .then(result => {
        assert.equal(web3.toUtf8(result[0][0]), 'AAABBB00A00B000C', "Checking fiscal code...");
        assert.equal(web3.toDecimal(result[2][0]), 1, "Checking badge number...");
        assert.equal(web3.toDecimal(result[3][0]), 1, "Adding new admin ok");
      })
  });
/*
  it('Should add a new teacher', function() {
    AdminContract.deployed()
      .then( adminInstance => {
        return adminInstance.addUser('GLBFE14A01A001L', '1234567890', 2, { from: address[0] });
      })
      .then( adminInstance => {
        return adminInstance.getUserData({from: address[0]});
      })
      .then(result => {
        assert.equal(web3.toUtf8(result[0][1]), 'GLBFE14A01A001L', "Checking fiscal code...");
        assert.equal(web3.toDecimal(result[2][0]), 2, "Checking for the badge number...");
        assert.equal(web3.toDecimal(result[3][0]), 2, "Adding the new teacher: ok");
      })
  });

  it('Should add a new student', function() {
    AdminContract.deployed()
      .then( adminInstance => {
        return adminInstance.addUser('QPMKLW43S70F898D', '1234567890', 3, { from: address[0] });
      })
      .then( adminInstance => {
        return adminInstance.getUserData({from: address[0]});
      })
      .then(result => {
        assert.equal(web3.toUtf8(result[0][2]), 'QPMKLW43S70F898D', "Checking fiscal code...");
        assert.equal(web3.toDecimal(result[2][0]), 3, "Checking for the badge number...");
        assert.equal(web3.toDecimal(result[3][0]), 3, "Adding the new student: ok");
      })
  });*/
})


contract('Admin, UserLogic', (address) => {
  
  it('should check for a newly added admin', function () {
    AdminContract.deployed()
      .then(adminInstance => {
        return adminInstance.addUser('AAABBB00A00B000C', '1234567890', 1, { from: address[0] })
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

  let adminInstance
  let degreeInstance;
  AdminContract.deployed().then((inst) => { adminInstance = inst; });
  DegreeContract.deployed({from: address[0]}).then((inst) => { degreeInstance = inst; });

  it('should add a new year', async () => {
    await adminInstance.addNewYear(2017, { from: address[0] });
    const result = await degreeInstance.getAcademicYears({ from: address[0] });
    assert.equal(parseInt(result[0].slice(2, -5), 16), 2017, 'Error adding a new year')
  });

  it("should check for a newly added year", async () => {
    await adminInstance.addNewYear(2018, { from: address[0] });
    const result = await degreeInstance.isYear(2018, { from: address[0] });
    assert.equal(result, true, "Adding new year ok");
  });

  /*it("should check if an existing year is correctly deleted", async () => {
    adminInstance.addNewYear(2019, { from: address[0] });
    const yearIndex = await degreeInstance.getYearIndex(2019, { from: address[0] } );
    //await degreeInstance.deleteYear(yearIndex, { from: address[0] });
    await adminInstance.removeYear(2019, {from: address[0]});
    const result = await degreeInstance.isYear(2019, { from: address[0] });
    assert.equal(result, false, "Year deleted successfully");
  });*/

  it("should check if an existing year is correctly deleted", function () {
    AdminContract.deployed()
      .then(adInstance => {
        return adInstance.addNewYear(2019, { from: address[0] })
      });
    DegreeContract.deployed()
      .then(degInstance => {
        return degInstance.removeYear(2019, { from: address[0] }) /* Perchè va?  */
      })
      .then(degInstance => {
        return degInstance.isYear(2019, { from: address[0] })
      })
      .then(isTrue => {
        assert.equal(isTrue, false, "Year deleted successfully");
      })
  });

  it("should check for a newly added degree course", async () => {
    await adminInstance.addNewDegree('INF18', 2018, 'asdasdasd', { from: address[0] });
    const result = await degreeInstance.isDegree('INF18', { from: address[0] });
    assert.equal(result, true, "Adding new degree ok");
  });

  it("should check if the previously added degree course is deleted correctly", async () => {
    await adminInstance.removeDegree('INF18', 2018, 0);
    const result = await degreeInstance.isDegree('INF18', { from: address[0] });
    assert.equal(result, false, "Degree INF19 correctly deleted");
  });

})  

contract('Admin, CourseData', (address) => {
  let adminInstance
  let courseInstance;
  AdminContract.deployed().then((inst) => { adminInstance = inst; });
  CourseContract.deployed({from: address[0]}).then((inst) => { courseInstance = inst; });

  it("should check for a newly added class", async () => {
    await adminInstance.addNewCourse('INF18', 'PROGR18', 'asdasdasd', { from: address[0] });
    const result = await courseInstance.isCourse('PROGR18', { from: address[0] });
    assert.equal(result, true, "Added the new class PROGR18 ok");
  });

  it("should check if the previously added class is deleted correctly", async () => {
    await adminInstance.removeCourse('PROGR18', { from: address[0] });
    const result = await courseInstance.isCourse('PROGR18', { from: address[0] });
    assert.equal(result, false , "Deleted the class PROGR18 ok");
  });
})


/*controllare con insegnanti e studenti, voti, ecc*/
contract ('Admin, CourseData, ExamData', (address) => {
  let adminInstance, courseInstance, examInstance;
  AdminContract.deployed().then((inst) => { adminInstance = inst; });
  CourseContract.deployed({from: address[0]}).then((inst) => { courseInstance = inst; });
  ExamContract.deployed({from: address[0]}).then((inst) => { examInstance = inst; });

  it("should chek for a newly added exam", async () => {
    await adminInstance.addNewCourse('INF18', 'PROGR18', 'asdasdasd', { from: address[0] });
    await adminInstance.addNewExam('PROGR18', 'PROG18_1_6_2018', 'gilbExam',  { from: address[0] });
    const result = await examInstance.isExam('PROG18_1_6_2018',  { from: address[0] });
    assert.equal(result, true , "Added a new exam for the class PROGR18 ok");
  });

  /*it("should check if the added exam is an exam of the class PROGR18", async () => {
    const result = await courseInstance.getCourseExamsData( 'PROGR18', { from: address[0] });
    const isExam = await examInstance.isExam(web3.utils.toUtf8(result[0][0]),  { from: address[0] });
    assert.equal(isExam, true , "PROG18_1_6_2018 is ab exam");
    //assert.equal(web3.utils.toUtf8(result[0]), 'PROG18_1_6_2018', "PROG18_1_6_2018 is an exam of PROGR18 ok");
  });*/

  it("should check if the added exam is an exam of the class PROGR18", function () {
    CourseContract.deployed()
      .then(courseInstance => {
        return courseInstance.getCourseExamsData( 'PROGR18', { from: address[0] });
      })
      CourseContract.deployed()  
      .then(courseInstance => {
        return courseInstance.isExam(web3.utils.toUtf8(result[0][0]),  { from: address[0] });
      })
    ExamContract.deployed()
      .then(exInstance => {
        return exInstance.isExam('PROG18_1_6_2018',  { from: address[0] });
      })
      .then(res => {
        assert.equal(res, true , "Added a new exam for the class PROGR18 ok");
      })
  });

  it("should check if the previously added exam is deleted correctly", async () => {
    await adminInstance.removeExam('PROG18_1_6_2018', { from: address[0] });
    const result = await examInstance.isExam('PROG18_1_6_2018',  { from: address[0] });
    assert.equal(result, false , "Deleted the exam PROG18_1_6_2018 ok");
  });

})