const IPFS = require('ipfs-mini')
const bs58 = require('bs58')
const regeneratorRuntime = require("regenerator-runtime"); // needed for async calls

/* eslint no-loop-func: "off" */

const AdminContract = artifacts.require('./Admin.sol')
const TeacherContract = artifacts.require('./Teacher.sol')
const StudentContract = artifacts.require('./Student.sol')
const LogicContract = artifacts.require('./UserLogic.sol')

// const Exam = artifacts.require('./Exam.sol')
var addresses = [
  '0x627306090abab3a6e1400e9345bc60c78a8bef57',
  '0xf17f52151ebef6c7334fad080c5704d77216b732',
  '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef',
  '0x821aea9a577a9b44299b9c15c88cf3087f3b5544',
  '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2',
  '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e',
  '0x2191ef87e392377ec08e7c08eb105ef5448eced5',
  '0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5',
  '0x6330a553fc93768f612722bb8c2ec78ac90b3bbc',
  '0x5aeda56215b167893e80b4fe645ba6d5bab767de',
  '0xE44c4cf797505AF1527B11e4F4c6f95531b4Be24',
  '0x69e1CB5cFcA8A311586e3406ed0301C06fb839a2',
  '0xF014343BDFFbED8660A9d8721deC985126f189F3',
  '0x0E79EDbD6A727CfeE09A2b1d0A59F7752d5bf7C9',
  '0x9bC1169Ca09555bf2721A5C9eC6D69c8073bfeB4',
]
const address0 = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
// const address1 = '0xf17f52151ebef6c7334fad080c5704d77216b732'
// const address2 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef'
// const address3 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544'
// const address4 = '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2'
// const address5 = '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e'
// const address6 = '0x2191ef87e392377ec08e7c08eb105ef5448eced5'
// const address7 = '0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5'
// const address8 = '0x6330a553fc93768f612722bb8c2ec78ac90b3bbc'
// const address9 = '0x5aeda56215b167893e80b4fe645ba6d5bab767de'

var ipfs = new IPFS({
  host: "54.93.231.212", // IPv4 Public IP of the AWS Server Instance
  port: '5001'
})

// var ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: '5001',
//   protocol: 'https'
// })

function getBytes32FromIpfsHash(ipfsListing) {
  return "0x" + bs58.decode(ipfsListing)
    .slice(2)
    .toString('hex')
}

// Return base58 encoded ipfs hash from bytes32 hex string,
// E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
// --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"

// function getIpfsHashFromBytes32(bytes32Hex) {
//   // Add our default ipfs values for first 2 bytes:
//   // function:0x12=sha2, size:0x20=256 bits
//   // and cut off leading "0x"
//   const hashHex = "1220" + bytes32Hex.slice(2)
//   const hashBytes = Buffer.from(hashHex, 'hex');
//   const hashStr = bs58.encode(hashBytes)
//   return hashStr
// }

function pushJSON(jsonPARAM) {
  return new Promise(function (resolve, reject) {
    ipfs.addJSON(jsonPARAM, function (err, data) {
      // setTimeout(() => {
      //   return reject("no ipfs network allowed")
      // }, 5)
      if(err !== null) return reject(err);
      resolve(data);
    })
  })
}

// function getJSON(hashIpfsPARAM) {
//   return new Promise(function (resolve, reject) {
//     ipfs.catJSON(hashIpfsPARAM, function (err, data) {
//       if(err !== null) return reject(err);
//       resolve(data);
//     })
//   })
// }

var insertUsers = [
  { FC: 'AAABBB00A00B000C', UC: '1234567890', tp: 1, degree: '' },
  // { FC: 'AAABBB00A00B001C', UC: '1234567880', tp: 1 },
  // { FC: 'AAABBB00A00B002C', UC: '1234567870', tp: 1 },
  { FC: 'BBBCCC11B11C111D', UC: '1234567891', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C112D', UC: '1234567881', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C113D', UC: '1234567871', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C114D', UC: '1234567861', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C115D', UC: '1234567851', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C116D', UC: '1234567841', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C117D', UC: '1234567831', tp: 2, degree: '' },
  { FC: 'BBBCCC11B11C118D', UC: '1234567821', tp: 2, degree: '' },

  { FC: 'CCCDDD22C22D222E', UC: '1234567892', tp: 3, degree: 'INFO17' },
  { FC: 'CCCDDD22C22D223E', UC: '1234567882', tp: 3, degree: 'INFO17' },
  { FC: 'CCCDDD22C22D224E', UC: '1234567872', tp: 3, degree: 'MATE17' }
]

var academicYears = [
  { year: "2017-2018" },
  { year: "2016-2017" },
  { year: "2015-2016" }
  // { year: "2015-2016" },
  // { year: "2014-2015" },
  // { year: "2013-2014" },
]

var degrees = [ //to be transformed into degreeData.description
  { year: "2017-2018", degreeData: "Informatica", degreeUnicode: 'INFO17' },
  { year: "2017-2018", degreeData: "Matematica", degreeUnicode: 'MATE17' },
  { year: "2017-2018", degreeData: "Psicologia", degreeUnicode: 'PSIC17' },
  { year: "2017-2018", degreeData: "Ingegneria dell'energia", degreeUnicode: 'IENE17' },
  { year: "2017-2018", degreeData: "Giurisprudenza", degreeUnicode: 'GIUR17' },
  { year: "2017-2018", degreeData: "Fisica", degreeUnicode: 'FISI17' },
  { year: "2017-2018", degreeData: "Medicina", degreeUnicode: 'MEDI17' },
  { year: "2016-2017", degreeData: "Informatica", degreeUnicode: 'INFO16' },
  { year: "2016-2017", degreeData: "Matematica", degreeUnicode: 'MATI16' },
  { year: "2016-2017", degreeData: "Psicologia", degreeUnicode: 'PSIC16' },
  { year: "2016-2017", degreeData: "Medicina", degreeUnicode: 'MEDI16' },
  { year: "2016-2017", degreeData: "Fisica", degreeUnicode: 'FISI16' }
]

var signUpUsers = [
  { FC: 'AAABBB00A00B000C', UC: '1234567890', name: 'John', surname: 'Smith', email: 'john@smith.com' },
  // { FC: 'AAABBB00A00B001C', UC: '1234567880', name: 'Johnny', surname: 'Reid', email: 'johnny@reid.com' },
  // { FC: 'AAABBB00A00B002C', UC: '1234567870', name: 'JohnyStecchino', surname: 'Kennedy', email: 'johnnyStecchino@kennedy.com' },
  { FC: 'BBBCCC11B11C111D', UC: '1234567891', name: 'Jessica', surname: 'Rabbit', email: 'jessica@rabbit.com' },
  { FC: 'BBBCCC11B11C112D', UC: '1234567881', name: 'Marta', surname: 'Wagner', email: 'marta@wagner.com' },

  { FC: 'BBBCCC11B11C113D', UC: '1234567871', name: 'James', surname: 'Bond 🔫', email: 'james@bond.com' },
  { FC: 'BBBCCC11B11C114D', UC: '1234567861', name: 'David', surname: 'Jones', email: 'david@jones.com' },
  { FC: 'BBBCCC11B11C115D', UC: '1234567851', name: 'Peter', surname: 'Garcia', email: 'peter@garcia.com' },
  { FC: 'BBBCCC11B11C116D', UC: '1234567841', name: 'Patricia', surname: 'Taylor', email: 'patricia@taylor.com' },
  { FC: 'BBBCCC11B11C117D', UC: '1234567831', name: 'Andrew', surname: 'Young', email: 'andrew@young.com' },
  { FC: 'BBBCCC11B11C118D', UC: '1234567821', name: 'Jennifer', surname: 'McDonald', email: 'jennifer@mcdonald.com' },

  // { FC: 'BBBCCC11B11C113D', UC: '1234567871', name: 'Alina', surname: 'Miles', email: 'alina@miles.com' },
  { FC: 'CCCDDD22C22D222E', UC: '1234567892', name: 'Rachel', surname: 'McAdams', email: 'rachel@mcadams.com' },
  { FC: 'CCCDDD22C22D223E', UC: '1234567882', name: 'Kate', surname: 'Hardy', email: 'kate@hardy.com' },
  { FC: 'CCCDDD22C22D224E', UC: '1234567872', name: 'Margot', surname: 'Peterson', email: 'margot@peterson.com' }
]

var classes = [
  { year: "2017-2018", degreeUnicode: "INFO17", classData: "Reti e sicurezza", classUnicode: 'RETI17', teacher: '2' },
  { year: "2017-2018", degreeUnicode: "INFO17", classData: "Calcolo numerico", classUnicode: 'CALC17', teacher: '3' },
  { year: "2017-2018", degreeUnicode: "INFO17", classData: "Programmazione 1", classUnicode: 'PROG17', teacher: '4' },
  { year: "2017-2018", degreeUnicode: "INFO17", classData: "Basi di dati", classUnicode: 'BASI17', teacher: '2' },
  { year: "2017-2018", degreeUnicode: "INFO17", classData: "Ricerca operativa", classUnicode: 'RICE17', teacher: '5' },
  { year: "2017-2018", degreeUnicode: "MEDI17", classData: "Neurologia", classUnicode: 'NEUR17', teacher: '6' },
  { year: "2017-2018", degreeUnicode: "FISI17", classData: "Analisi matematica 1", classUnicode: 'ANAL17', teacher: '7' },
  { year: "2016-2017", degreeUnicode: "FISI16", classData: "Metodi matematici", classUnicode: 'METO16', teacher: '8' },
  { year: "2016-2017", degreeUnicode: "PSIC16", classData: "French fries", classUnicode: 'FREN16', teacher: '9' }
]

var exams = [
  { classUnicode: 'PROG17', examUnicode: 'PROG17-1', type: 'Written', place: 'LUF1', date: '2017-06-05', time: '10:30' },
  { classUnicode: 'PROG17', examUnicode: 'PROG17-2', type: 'Written', place: 'LUF1', date: '2017-06-30', time: '14:30' },
  { classUnicode: 'PROG17', examUnicode: 'PROG17-3', type: 'Written', place: 'LUF1', date: '2017-09-02', time: '09:00' },
  { classUnicode: 'RETI17', examUnicode: 'RETI17-1', type: 'Written', place: 'LUM250', date: '2017-06-11', time: '10:30' },
  { classUnicode: 'RETI17', examUnicode: 'RETI17-2', type: 'Written', place: 'LUM250', date: '2017-07-07', time: '14:30' },
  { classUnicode: 'RETI17', examUnicode: 'RETI17-3', type: 'Written', place: 'LUM250', date: '2017-09-08', time: '09:00' },
  { classUnicode: 'CALC17', examUnicode: 'CALC17-1', type: 'Written', place: 'LUF1', date: '2017-06-06', time: '10:30' },
  { classUnicode: 'CALC17', examUnicode: 'CALC17-2', type: 'Written', place: 'LUF1', date: '2017-06-28', time: '14:30' },
  { classUnicode: 'CALC17', examUnicode: 'CALC17-3', type: 'Written', place: 'LUF1', date: '2017-09-07', time: '09:00' },
  { classUnicode: 'BASI17', examUnicode: 'BASI17-1', type: 'Written', place: 'LUM250', date: '2017-06-09', time: '10:30' },
  { classUnicode: 'BASI17', examUnicode: 'BASI17-2', type: 'Written', place: 'LUM250', date: '2017-06-27', time: '14:30' },
  { classUnicode: 'BASI17', examUnicode: 'BASI17-3', type: 'Written', place: 'LUM250', date: '2017-09-09', time: '09:00' },
  { classUnicode: 'RICE17', examUnicode: 'RICE17-1', type: 'Written', place: '1C150', date: '2017-06-10', time: '10:30' },
  { classUnicode: 'RICE17', examUnicode: 'RICE17-2', type: 'Written', place: '1C150', date: '2017-07-15', time: '14:30' },
  { classUnicode: 'RICE17', examUnicode: 'RICE17-3', type: 'Written', place: '1C150', date: '2017-09-13', time: '09:00' },
  { classUnicode: 'MEDI17', examUnicode: 'MEDI17-1', type: 'Oral', place: 'AULA MAGNA NEUROLOGIA', date: '2017-06-07', time: '10:30' },
  { classUnicode: 'MEDI17', examUnicode: 'MEDI17-2', type: 'Oral', place: 'AULA MAGNA NEUROLOGIA', date: '2017-06-23', time: '14:30' },
  { classUnicode: 'MEDI17', examUnicode: 'MEDI17-3', type: 'Oral', place: 'AULA MAGNA NEUROLOGIA', date: '2017-08-30', time: '09:00' },
  { classUnicode: 'FREN16', examUnicode: 'FREN16-1', type: 'Practice', place: 'MURIALDO', date: '2017-06-07', time: '10:30' },
  { classUnicode: 'FREN16', examUnicode: 'FREN16-2', type: 'Practice', place: 'MURIALDO', date: '2017-06-23', time: '14:30' },
  { classUnicode: 'FREN16', examUnicode: 'FREN16-3', type: 'Practice', place: 'MURIALDO', date: '2017-08-30', time: '09:00' }
]

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

// async function deployer(contract) {
//   return await contract.deployed()
// }
// // var adminInstance = await AdminContract.deployed()

// var adminInstance = deployer(AdminContract)
// var userLogicInstance = deployer(LogicContract)
// var studentInstance = deployer(StudentContract)

var adminInstance
var userLogicInstance
var studentInstance

AdminContract.deployed()
  .then(instance => {
    adminInstance = instance
  })
  .then(() => {
    LogicContract.deployed()
      .then(instance => userLogicInstance = instance)
      .then(() => {
        StudentContract.deployed()
          .then(instance => studentInstance = instance)
          .then(async () => {
            await addUsers(insertUsers)
            await addAcademicYears(academicYears)
            await addDegrees(degrees)
            await signUpUser(signUpUsers)
            await addClass(classes)
            await addExams(exams)
            await subscribeStudents()
          })
      })
  })

async function addUsers(users) {
  // AdminContract.deployed()
  // .then(async (adminInstance) => {
  var insertUserLine = 0;
  for(var user of users) {
    // (async) => {
    try {
      await adminInstance.addUser(user.FC, user.UC, user.tp, user.degree, { from: addresses[0] });
      console.log('insertUser ' + insertUserLine++ + ' ok');
      // .then(() => console.log('insertUser ' + insertUserLine++ + ' ok'))
    } catch(error) {
      console.error('Error at insertUser' + insertUserLine++);
    }
    // .catch(() => console.error('Error at insertUser' + insertUserLine++));
    // }
  }
}

async function addAcademicYears(years) {
  var academicYearLine = 0;
  for(var year of years) {
    year = year.year.slice(0, 4)
    try {
      await adminInstance.addNewYear(year, { from: addresses[0] })
      console.log('year ' + academicYearLine++ + ' ok')
    } catch(error) {
      console.error('Error at year ' + academicYearLine++)
    }
  }
}

// var degreeData = {
//   'degreeUnicode': "",
//   'year': "",
//   'degreeData': ""
// }

async function addDegrees(degreeCourse) {
  var degreeLine = 0;
  for(var degree of degreeCourse) {
    try {
      var hashIPFS = await pushJSON({
        "degreeUnicode": degree.degreeUnicode,
        "year": degree.year,
        "degreeData": degree.degreeData
      })
    } catch(error) {
      console.error('Error while pushing JSON on IPFS')
    }

    var year = degree.year.slice(0, 4)
    var hash = getBytes32FromIpfsHash(hashIPFS);
    try {
      await adminInstance.addNewDegree(degree.degreeUnicode, year, hash, { from: address0 })
      console.log('Degree ' + degreeLine++ + ' ok')
    } catch(error) {
      console.error('Error at degree ' + degreeLine++)
    }
  }
}
// console.log("Added all degrees")
async function signUpUser(users) {
  // var userData = {
  //   "name": '',
  //   "surname": '',
  //   "email": '',
  //   "FC": '',
  //   "UC": ''
  // }
  var signUpLine = 0;
  var j = 1;
  for(let user of users) {
    try {
      var hashIPFS = await pushJSON({
        "name": user.name,
        "surname": user.surname,
        "email": user.email,
        "FC": user.FC,
        "UC": user.UC
      })
    } catch(error) {
      console.error('Error while pushing JSON on IPFS')
    }
    var hash = getBytes32FromIpfsHash(hashIPFS);
    try {
      await userLogicInstance.signUp(user.FC, user.UC, hash, { from: addresses[j++] })
      console.log('Signup ' + signUpLine++ + ' ok')
    } catch(error) {
      console.error('Error at signup ' + signUpLine++)
    }
  }
  // console.log('Signed Up all users')
}

async function addClass(classes) {
  // AdminContract.deployed()
  // .then(async adminInstance => {

  // var classData = {
  //   /*'year': year,
  //   'degreeUnicode': degreeUnicode,
  //   'classUnicode': classUnicode,*/
  //   'classData': ""
  // }
  var classLine = 0;
  for(var Sclass of classes) {
    try {
      var hashIPFS = await pushJSON({
        /*'year': year,
        'degreeUnicode': degreeUnicode,*/
        'classUnicode': Sclass.classUnicode,
        'classData': Sclass.classData
      })
    } catch(error) {
      console.error('Error while pushing JSON on IPFS')
    }
    var hash = getBytes32FromIpfsHash(hashIPFS);
    try {
      await adminInstance.addNewClass(Sclass.degreeUnicode, Sclass.classUnicode, hash, Sclass.teacher, { from: address0 })
      console.log('Class ' + classLine++ + ' ok')
    } catch(error) {
      console.error('Error at class ' + classLine++)
    }
  }
}
// console.log('Added all classes')

async function addExams(exams) {
  // let examData = {
  //   "type": '',
  //   "place": '',
  //   "date": '',
  //   "time": ''
  // }
  var examsLine = 0;
  for(var exam of exams) {
    try {
      var hashIPFS = await pushJSON({
        "type": exam.type,
        "place": exam.place,
        "date": exam.date,
        "time": exam.time
      })
    } catch(error) {
      console.error('Error while pushing JSON on IPFS')
    }
    var hash = getBytes32FromIpfsHash(hashIPFS);
    try {
      await adminInstance.addNewExam(exam.classUnicode, exam.examUnicode, hash, { from: address0 })
      console.log('Exam ' + examsLine++ + ' ok')
    } catch(error) { console.error('Error at exam ' + examsLine++) }
  }
}

async function subscribeStudents() {
  var subscribedLine = 0
  try {
    await studentInstance.subscribeExam(exams[0].examUnicode, { from: addresses[10] })
    console.log('address4 subscribed PROG17-1 ' + subscribedLine++ + ' ok')
  } catch(error) { console.error('Error at subscribed ' + subscribedLine++) }
  try {
    studentInstance.subscribeExam(exams[0].examUnicode, { from: addresses[11] })
    console.log('address4 subscribed PROG17-1 ' + subscribedLine++ + ' ok')
  } catch(error) { console.error('Error at subscribed ' + subscribedLine++) }
}

// new Promise(async function (resolve, reject) {
//   await addUsers(insertUsers)
//   await addAcademicYears(academicYears)
//   await addDegrees(degrees)
//   await signUpUser(signUpUsers)
//   await addClass(classes)
//   await addExams(exams)
//   await subscribeStudents()
// })

// })
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