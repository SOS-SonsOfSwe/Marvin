const Degree = artifacts.require('./DegreeData.sol');
const AdminContract = artifacts.require('./Admin.sol');

const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'

var y = 2018;
AdminContract.deployed()
  .then(async (adminInstance) => {
    degreeInstance = Degree.deployed()
      .then(async (degreeInstance) => {
        await adminInstance.addNewDegree('INF17', y, 'asdasdasdasdasd', { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(y)
              .then(res => console.log('Insert 1: ' + res))
          })
          .catch(() => console.error('Error Insert 1'));
        await adminInstance.addNewDegree('MAT17', y, 'asdasdasdasdasd', { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(y)
              .then(res => console.log('Insert 2: ' + res))
          })
          .catch(() => console.error('Error Insert 2'));
        await adminInstance.addNewDegree('PSI17', y, 'asdasdasdasdasd', { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(y)
              .then(res => console.log('Insert 3: ' + res))
          })
          .catch(() => console.error('Error Insert 3'));

        await adminInstance.removeDegree('INF17', y, { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(y)
              .then(res => console.log('Remove 1: ' + res))
          })
          .catch(() => console.error('Error Remove 1'));
        await adminInstance.removeDegree('MAT17', y, { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(y)
              .then(res => console.log('Remove 2: ' + res))
          })
          .catch(() => console.error('Error Remove 2'));
        await adminInstance.removeDegree('PSI17', y, { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(y)
              .then(res => console.log('Remove 3: ' + res))
          })
          .catch(() => console.error('Error Remove 3'));
      })
  })