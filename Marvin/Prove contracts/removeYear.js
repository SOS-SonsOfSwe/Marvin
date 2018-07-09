const Degree = artifacts.require('./DegreeData.sol');
const AdminContract = artifacts.require('./Admin.sol');

const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'

AdminContract.deployed()
  .then(async (adminInstance) => {
    degreeInstance = Degree.deployed()
      .then(async (degreeInstance) => {
        await adminInstance.addNewYear('2012', { from: address })
          .then(() => {
            degreeInstance.getAcademicYears()
              .then(res => console.log('Insert 1: ' + res))
          })
          .catch(() => console.error('Error Insert 1'))
        await adminInstance.addNewYear('2013', { from: address })
          .then(() => {
            degreeInstance.getAcademicYears()
              .then(res => console.log('Insert 2: ' + res))
          })
          .catch(() => console.error('Error Insert 2'));
        await adminInstance.addNewYear('2014', { from: address })
          .then(() => {
            degreeInstance.getAcademicYears()
              .then(res => console.log('Insert 3: ' + res))
          })
          .catch(() => console.error('Error Insert 3'));


        await adminInstance.removeYear(2012, { from: address })
          .then(() => {
            degreeInstance.getAcademicYears()
              .then(res => console.log('Remove 3: ' + res))
          })
          .catch(() => console.error('Error Remove 3'));
        await adminInstance.removeYear(2014, { from: address })
          .then(() => {
            degreeInstance.getAcademicYears()
              .then(res => console.log('Remove 2: ' + res))
          })
          .catch(() => console.error('Error Remove 2'));
        await adminInstance.removeYear(2013, { from: address })
          .then(() => {
            degreeInstance.getAcademicYears()
              .then(res => console.log('Remove 1: ' + res))
          })
          .catch(() => console.error('Error Remove 1'));
      })
  })