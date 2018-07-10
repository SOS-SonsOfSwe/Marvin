const Degree = artifacts.require('./DegreeData.sol');
const Class = artifacts.require('./ClassData.sol');
const AdminContract = artifacts.require('./Admin.sol');

const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'

AdminContract.deployed()
  .then(async (adminInstance) => {
    degreeInstance = Degree.deployed()
      .then(async (degreeInstance) => {
        //Aggiunta Degree
        await adminInstance.addNewDegree('INF17', 2018, 'asdasdasdasdasd', { from: address })
          .then(() => {
            degreeInstance.getYearDegrees(2018)
              .then(res => console.log('Insert Degree: ' + res))
          })
          .catch(() => console.error('Error Insert Degree'));

        // Aggiunta Classes
        await adminInstance.addNewClass('INF17', 'SWE', 'asdasdasdasdasd', 1, { from: address })
          .then(() => {
            degreeInstance.getClasses('INF17')
              .then(res => console.log('Classes: ' + res))
          })
          .catch(() => console.error('Error Insert Class1'));
        await adminInstance.addNewClass('INF17', 'PROG', 'asdasdasdasdasd', 1, { from: address })
          .then(() => {
            degreeInstance.getClasses('INF17')
              .then(res => console.log('Classes: ' + res))
          })
          .catch(() => console.error('Error Insert Class2'));
        await adminInstance.addNewClass('INF17', 'ANAL', 'asdasdasdasdasd', 2, { from: address })
          .then(() => {
            degreeInstance.getClasses('INF17')
              .then(res => console.log('Classes: ' + res))
          })
          .catch(() => console.error('Error Insert Class3'));

        // Indici classes
        await adminInstance.getClassIndex('SWE')
          .then(res => console.log('Index Class1: ' + res))
        await adminInstance.getClassIndex('PROG')
          .then(res => console.log('Index Class2: ' + res))
        await adminInstance.getClassIndex('ANAL')
          .then(res => console.log('Index Class3: ' + res))

        await adminInstance.removeClass('INF17', 'SWE', { from: address })
          .then(() => {
            degreeInstance.getClasses('INF17')
              .then(res => console.log('Remove Class1: ' + res))
          })
        await adminInstance.removeClass('INF17', 'PROG', { from: address })
          .then(() => {
            degreeInstance.getClasses('INF17')
              .then(res => console.log('Remove Class2: ' + res))
          })
        await adminInstance.removeClass('INF17', 'ANAL', { from: address })
          .then(() => {
            degreeInstance.getClasses('INF17')
              .then(res => console.log('Remove Class3: ' + res))
          })
      })
  })