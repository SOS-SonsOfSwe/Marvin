const IPFS = require('ipfs-mini')
const bs58 = require('bs58')

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
  '0x5aeda56215b167893e80b4fe645ba6d5bab767de'
]
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

function getJSON(hashIpfsPARAM) {
  return new Promise(function (resolve, reject) {
    ipfs.catJSON(hashIpfsPARAM, function (err, data) {
      if(err !== null) return reject(err);
      resolve(data);
    })
  })
}

var insertUsers = [
  { FC: 'AAABBB00A00B000C', UC: '1234567890', tp: 1 },
  { FC: 'AAABBB00A00B001C', UC: '1234567880', tp: 1 },
  { FC: 'AAABBB00A00B002C', UC: '1234567870', tp: 1 },
  { FC: 'BBBCCC11B11C111D', UC: '1234567891', tp: 2 },
  { FC: 'BBBCCC11B11C112D', UC: '1234567881', tp: 2 },
  { FC: 'BBBCCC11B11C113D', UC: '1234567871', tp: 2 },
  { FC: 'CCCDDD22C22D222E', UC: '1234567892', tp: 3 },
  { FC: 'CCCDDD22C22D223E', UC: '1234567882', tp: 3 },
  { FC: 'CCCDDD22C22D224E', UC: '1234567872', tp: 3 }
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
  { year: "2017-2018", degreeData: "Informatica", degreeUnicode: 'INF17' },
  { year: "2017-2018", degreeData: "Matematica", degreeUnicode: 'MAT17' },
  { year: "2017-2018", degreeData: "Psicologia", degreeUnicode: 'PSI17' },
  // { year: "2017-2018", degreeData: "Ingegneria dell'energia", degreeUnicode: 'ING/ENE17' },
  // { year: "2017-2018", degreeData: "Giurisprudenza", degreeUnicode: 'GIUR17' },
  // { year: "2017-2018", degreeData: "Fisica", degreeUnicode: 'FIS17' },
  // { year: "2016-2017", degreeData: "Medicina", degreeUnicode: 'MED17' },
  // { year: "2016-2017", degreeData: "Informatica", degreeUnicode: 'MAT/INF16' },
  // { year: "2016-2017", degreeData: "Matematica", degreeUnicode: 'MAT16' },
  // { year: "2016-2017", degreeData: "Psicologia", degreeUnicode: 'PSI16' },
  // { year: "2016-2017", degreeData: "Medicina", degreeUnicode: 'MED16' },
  // { year: "2016-2017", degreeData: "Fisica", degreeUnicode: 'FIS16' }
]

var signUpUsers = [
  { FC: 'AAABBB00A00B000C', UC: '1234567890', name: 'John', surname: 'Smith', email: 'john@smith.com' },
  { FC: 'AAABBB00A00B001C', UC: '1234567880', name: 'Johnny', surname: 'Reid', email: 'johnny@reid.com' },
  { FC: 'AAABBB00A00B002C', UC: '1234567870', name: 'JohnyStecchino', surname: 'Kennedy', email: 'johnnyStecchino@kennedy.com' },
  { FC: 'BBBCCC11B11C111D', UC: '1234567891', name: 'Jessica', surname: 'Rabbit', email: 'jessica@rabbit.com' },
  { FC: 'BBBCCC11B11C112D', UC: '1234567881', name: 'Marta', surname: 'Wagner', email: 'marta@wagner.com' },
  { FC: 'BBBCCC11B11C113D', UC: '1234567871', name: 'Alina', surname: 'Miles', email: 'alina@miles.com' },
  { FC: 'CCCDDD22C22D222E', UC: '1234567892', name: 'Rachel', surname: 'McAdams', email: 'rachel@mcadams.com' },
  { FC: 'CCCDDD22C22D223E', UC: '1234567882', name: 'Kate', surname: 'Hardy', email: 'kate@hardy.com' },
  { FC: 'CCCDDD22C22D224E', UC: '1234567872', name: 'Margot', surname: 'Peterson', email: 'margot@peterson.com' },
]

var classes = [
  { year: "2017-2018", degreeUnicode: "INF17", classData: "Reti e sicurezza", classUnicode: 'RETISI17' },
  { year: "2017-2018", degreeUnicode: "INF17", classData: "Calcolo numerico", classUnicode: 'CALCNU17' },
  { year: "2017-2018", degreeUnicode: "INF17", classData: "Programmazione 1", classUnicode: 'PROGR17' },
  // { year: "2017-2018", degreeUnicode: "FIS17", classData: "Analisi matematica 1", classUnicode: 'ANALMAT117' },
  // { year: "2016-2017", degreeUnicode: "FIS16", classData: "Metodi matematici", classUnicode: 'METOMATE16' },
  // { year: "2016-2017", degreeUnicode: "FIS16", classData: "Fisica moderna", classUnicode: 'FISIMODE17' }
]

var exams = [
  { classUnicode: 'PROGR17', examUnicode: 'APP1', type: 'Writing', place: 'LUF1', date: '01/01/2017', time: '14:00' },
  { classUnicode: 'PROGR17', examUnicode: 'APP2', type: 'Writing', place: 'LUF1', date: '10/01/2017', time: '14:00' },
  { classUnicode: 'PROGR17', examUnicode: 'APP3', type: 'Writing', place: 'LUF1', date: '20/07/2017', time: '14:00' },
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

AdminContract.deployed()
  .then(async (adminInstance) => {
    var insertUserLine = 0;
    for(var user of insertUsers) {
      await adminInstance.addUser(user.FC, user.UC, user.tp, { from: addresses[0] })
        .then(() => console.log('insertUser ' + insertUserLine++ + ' ok'))
        .catch(() => console.error('Error at insertUser' + insertUserLine++));
    }

    var academicYearLine = 0;
    for(var year of academicYears) {
      year = year.year.slice(0, 4)
      await adminInstance.addNewYear(year, { from: addresses[0] })
        .then(() => console.log('year ' + academicYearLine++ + ' ok'))
        .catch(() => console.error('Error at year ' + academicYearLine++));
    }

    // var degreeData = {
    //   'degreeUnicode': "",
    //   'year': "",
    //   'degreeData': ""
    // }
    var degreeLine = 0;
    var hash;
    for(var degree of degrees) {
      await pushJSON({
          "degreeUnicode": degree.degreeUnicode,
          "year": degree.year,
          "degreeData": degree.degreeData
        })
        .then(hashIPFS => {
          year = degree.year.slice(0, 4)
          hash = getBytes32FromIpfsHash(hashIPFS);
          adminInstance.addNewDegree(degree.degreeUnicode, year, hash, { from: address0 })
            .then(() => console.log('Degree ' + degreeLine++ + ' ok'))
            .catch(() => console.error('Error at degree ' + degreeLine++));
        })
    }
    return adminInstance
    // console.log("Added all degrees")

  })
  .then(async adminInstance => {
    LogicContract.deployed()
      .then(async (userLogicInstance) => {
        // var userData = {
        //   "name": '',
        //   "surname": '',
        //   "email": '',
        //   "FC": '',
        //   "UC": ''
        // }
        var signUpLine = 0;
        var hash;
        var j = 1;
        for(let user of signUpUsers) {
          await pushJSON({
              "name": user.name,
              "surname": user.surname,
              "email": user.email,
              "FC": user.FC,
              "UC": user.UC
            })
            .then(hashIPFS => {
              hash = getBytes32FromIpfsHash(hashIPFS);
              userLogicInstance.signUp(user.FC, user.UC, hash, { from: addresses[j++] })
                .then(() => console.log('Signup ' + signUpLine++ + ' ok'))
                .catch(() => console.error('Error at signup ' + signUpLine++));
            })
        }
        return adminInstance
        // console.log('Signed Up all users')
      })
      .then(async (adminInstance) => {
        // AdminContract.deployed()
        // .then(async adminInstance => {

        // var classData = {
        //   /*'year': year,
        //   'degreeUnicode': degreeUnicode,
        //   'classUnicode': classUnicode,*/
        //   'classData': ""
        // }
        var classLine = 0;
        var hash;
        for(var Sclass of classes) {
          await pushJSON({
              /*'year': year,
              'degreeUnicode': degreeUnicode,
              'classUnicode': classUnicode,*/
              'classData': Sclass.classData
            })
            .then(hashIPFS => {
              hash = getBytes32FromIpfsHash(hashIPFS);
              adminInstance.addNewClass(Sclass.degreeUnicode, Sclass.classUnicode, hash, '1234567891', { from: address0 })
                .then(() => console.log('Class ' + classLine++ + ' ok'))
                .catch(() => console.error('Error at class ' + classLine++));
            })
        }
        // console.log('Added all classes')

        // let examData = {
        //   "type": '',
        //   "place": '',
        //   "date": '',
        //   "time": ''
        // }
        var examsLine = 0;
        for(var exam of exams) {
          await pushJSON({
              "type": exam.type,
              "place": exam.place,
              "date": exam.date,
              "time": exam.time
            })
            .then(hashIPFS => {
              hash = getBytes32FromIpfsHash(hashIPFS);
              adminInstance.addNewExam(exam.classUnicode, exam.examUnicode, hash, { from: address0 })
                .then(() => console.log('Exam ' + examsLine++ + ' ok'))
                .catch(() => console.error('Error at exam ' + examsLine++));
            })
        }
        // console.log('Added all exams')

      })
  })
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