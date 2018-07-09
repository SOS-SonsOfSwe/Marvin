/* eslint no-loop-func: "off" */

const AdminContract = artifacts.require('./Admin.sol')
const TeacherContract = artifacts.require('./Teacher.sol')
const StudentContract = artifacts.require('./Student.sol')
const LogicContract = artifacts.require('./UserLogic.sol')
// const Exam = artifacts.require('./Exam.sol')

const address0 = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
const address1 = '0xf17f52151ebef6c7334fad080c5704d77216b732'
const address2 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef'
const address3 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544'
const address4 = '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2'
const address5 = '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e'
const address6 = '0x2191ef87e392377ec08e7c08eb105ef5448eced5'
const address7 = '0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5'
const address8 = '0x6330a553fc93768f612722bb8c2ec78ac90b3bbc'
const address9 = '0x5aeda56215b167893e80b4fe645ba6d5bab767de'

/* added:
 * 10 users:
 * * 3 owners
 * * 3 professors
 * * 4 students
 * 19 academicYears, from 2000 to 2018
 * 8*19 degrees, 8 degrees for each academicYears
 * 2*8*19 teachings, 2 teachings for each degrees
 * 2*8*19 exams, 1 exam for each teachings
 */
var line = 0
AdminContract.deployed()
  .then(async (adminInstance) => {
    await adminInstance.addUser('AAABBB00A00B000C', '1234567890', '1', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('AAABBB00A00B001C', '1234567880', '1', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('AAABBB00A00B002C', '1234567870', '1', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('BBBCCC11B11C111D', '1234567891', '2', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('BBBCCC11B11C112D', '1234567881', '2', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('BBBCCC11B11C113D', '1234567871', '2', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('CCCDDD22C22D222E', '1234567892', '3', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('CCCDDD22C22D223E', '1234567882', '3', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addUser('CCCDDD22C22D224E', '1234567872', '3', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));

    await adminInstance.addNewYear(2012, { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));

    await adminInstance.addNewYear(2013, { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    const y = '2017'
    await adminInstance.addNewYear(y, { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addNewDegree('INF17', y, 'asdasdasdasdasd', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addNewDegree('MAT17', y, 'asdasdasdasdasd', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
    await adminInstance.addNewDegree('PSI17', y, 'asdasdasdasdasd', { from: address0 })
      .then(() => console.log('Line ' + line++ + ' ok'))
      .catch(() => console.error('Error at line ' + line++));
  })
  .then(() => {
    LogicContract.deployed()
      .then(async userLogicInstance => {
        await userLogicInstance.signUp('AAABBB00A00B000C', '1234567890', 'asdasdasdasdasd', { from: address1 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('AAABBB00A00B001C', '1234567880', 'asdasdasdasdasd', { from: address2 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('AAABBB00A00B002C', '1234567870', 'asdasdasdasdasd', { from: address3 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('BBBCCC11B11C111D', '1234567891', 'asdasdasdasdasd', { from: address4 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('BBBCCC11B11C112D', '1234567881', 'asdasdasdasdasd', { from: address5 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('BBBCCC11B11C113D', '1234567871', 'asdasdasdasdasd', { from: address6 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('CCCDDD22C22D222E', '1234567892', 'asdasdasdasdasd', { from: address7 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('CCCDDD22C22D223E', '1234567882', 'asdasdasdasdasd', { from: address8 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
        await userLogicInstance.signUp('CCCDDD22C22D224E', '1234567872', 'asdasdasdasdasd', { from: address9 })
          .then(() => console.log('Line ' + line++ + ' ok'))
          .catch(() => console.error('Error at line ' + line++));
      })
      .then(() => {
        AdminContract.deployed()
          .then(async adminInstance => {
            await adminInstance.addNewClass('INF17', 'PROGR17', 'asdasdasdasdasd', '1234567891', { from: address0 })
              .then(() => console.log('Line ' + line++ + ' ok'))
              .catch(() => console.error('Error at line ' + line++));
            await adminInstance.addNewClass('INF17', 'ANALIS17', 'asdasdasdasdasd', '1234567891', { from: address0 })
              .then(() => console.log('Line ' + line++ + ' ok'))
              .catch(() => console.error('Error at line ' + line++));
            await adminInstance.addNewClass('INF17', 'RETISICU17', 'asdasdasdasdasd', '1234567891', { from: address0 })
              .then(() => console.log('Line ' + line++ + ' ok'))
              .catch(() => console.error('Error at line ' + line++));

            await adminInstance.addNewExam('PROGR17', 'APP1', 'asdasdasdasdasd', { from: address0 })
              .then(() => console.log('Line ' + line++ + ' ok'))
              .catch(() => console.error('Error at line ' + line++));
            await adminInstance.addNewExam('PROGR17', 'APP2', 'asdasdasdasdasd', { from: address0 })
              .then(() => console.log('Line ' + line++ + ' ok'))
              .catch(() => console.error('Error at line ' + line++));
            await adminInstance.addNewExam('PROGR17', 'APP3', 'asdasdasdasdasd', { from: address0 })
              .then(() => console.log('Line ' + line++ + ' ok'))
              .catch(() => console.error('Error at line ' + line++));
          })
      })
  })
// .then(() => {
//   StudentContract.deployed()
//     .then(async studentInstance => {
//       await studentInstance.subscribeExam('APP1', { from: address7 })
//         .then(() => console.log('Line ' + line++ + ' ok'))
//         .catch(() => console.error('Error at line ' + line++));
//       await studentInstance.subscribeExam('APP1', { from: address8 })
//         .then(() => console.log('Line ' + line++ + ' ok'))
//         .catch(() => console.error('Error at line ' + line++));
//       await studentInstance.subscribeExam('APP1', { from: address9 })
//         .then(() => console.log('Line ' + line++ + ' ok'))
//         .catch(() => console.error('Error at line ' + line++));
//     })

//     .then(() => {
//       TeacherContract.deployed()
//         .then(async teacherInstance => {
//           await teacherInstance.registerResult('APP1', '7', '30', { from: address4 })
//             .then(() => console.log('Line ' + line++ + ' ok'))
//             .catch(() => console.error('Error at line ' + line++));
//           await teacherInstance.registerResult('APP1', '8', '20', { from: address4 })
//             .then(() => console.log('Line ' + line++ + ' ok'))
//             .catch(() => console.error('Error at line ' + line++));
//           await teacherInstance.registerResult('APP1', '9', '18', { from: address4 })
//             .then(() => console.log('Line ' + line++ + ' ok'))
//             .catch(() => console.error('Error at line ' + line++));
//         })
//         .then(() => {
//           StudentContract.deployed()
//             .then(async studentInstance => {
//               await studentInstance.confirmResult('APP1', { from: address7 })
//                 .then(() => console.log('Line ' + line++ + ' ok'))
//                 .catch(() => console.error('Error at line ' + line++));
//               await studentInstance.confirmResult('APP1', { from: address8 })
//                 .then(() => console.log('Line ' + line++ + ' ok'))
//                 .catch(() => console.error('Error at line ' + line++));
//               await studentInstance.confirmResult('APP1', { from: address9 })
//                 .then(() => console.log('Line ' + line++ + ' ok'))
//                 .catch(() => console.error('Error at line ' + line++));
//             })
//         })
// })
// })
// })

// StudentContract.deployed()
//   .then(async studentInstance => {
//     await studentInstance.subscribeExam('APP1', { from: address7 })
//     await studentInstance.subscribeExam('APP1', { from: address8 })
//     await studentInstance.subscribeExam('APP1', { from: address9 })
//   });

// TeacherContract.deployed()
//   .then(async teacherInstance => {
//     await teacherInstance.registerResult('APP1', '7', '30', { from: address4 })
//     await teacherInstance.registerResult('APP1', '8', '20', { from: address4 })
//     await teacherInstance.registerResult('APP1', '9', '18', { from: address4 })
//   });

// StudentContract.deployed()
//   .then(async studentInstance => {
//     await studentInstance.confirmResult('APP1', { from: address7 })
//     await studentInstance.confirmResult('APP1', { from: address8 })
//     await studentInstance.confirmResult('APP1', { from: address9 })
//   });