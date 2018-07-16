/*jshint loopfunc:true*/
import "regenerator-runtime/runtime"; // needed for async calls
import DegreeContract from '../../../../build/contracts/DegreeData'
import ClassContract from '../../../../build/contracts/ClassData'
import StudentContract from '../../../../build/contracts/Student'
import StudentDataContract from '../../../../build/contracts/StudentData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { EXAMS as req } from "../../reducers/costants/studentCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
  errorReadingData,
  ipfsReadingData,
  ipfsDataRead,
  ipfsNetworkError,
  ipfsErrorReadingData
} from '../StandardDispatches/readingData'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

var thereWasAnError = false

function doAwesomeStuff(load) {
  store.dispatch(dataRead({ load }, req))
  // console.error('Payload: ' + JSON.stringify(load))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  // return browserHistory.push('/profile/degrees') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

// async function processIPFSLoad(payload) {
//   var ipfs = new ipfsPromise()
//   const promises = payload.map(async item =>
//     item.load = await ipfs.getJSON(item.load)
//     // here I overwrite the description information with the JSON returning from the ipfs
//   )
//   await Promise.all(promises)
// }

async function processIPFSLoad(payload) {
  var ipfs = new ipfsPromise()
  return new Promise(async (resolve, reject) => {
    // for(var item of payload) {
    store.dispatch(ipfsReadingData())
    await Promise.all(payload.map(async (item, i, payload) => {
      try {

        return item.load = await ipfs.getJSON(item.load)
      } catch(error) {
        dError('Error during processing ipfs exam informations', error)
        store.dispatch(ipfsErrorReadingData())
        store.dispatch(ipfsNetworkError())
        return reject(error)
      }
      // here I overwrite the description information with the JSON returning from the ipfs
    }))
    // // console.log(payload)
    store.dispatch(ipfsDataRead())
    return resolve(payload)
  })
}

async function readExams(classInstance, classes, web3, coinbase) {
  var payload
  return new Promise(async function (resolve, reject) { // for(let sclass of classes)
    await Promise.all(classes.map(async classUnicode => {
      // // console.log(sclass)
      // var payloadToReturn
      try {
        var result = await classInstance.getClassExamsData(classUnicode, { from: coinbase })
        // result[0] = examHashcode
        // result[1] = examsTeacher
        // result[2] = examUnicode

        // // console.log('EXAMS READ RESULT: ')
        // // console.log(result)

        if(result[0].length === 0) {
          return payload
        } else {

          var hashIPFS
          for(let j = 0; j < result[0].length; j++) {
            var exam = result[2][j]
            var hash = result[0][j]
            var teac = web3.toDecimal(result[1])
            // // console.log("teacher: " + teac)
            var exUni = web3.toUtf8(exam)
            // // console.log('dgr: ' + dgr)
            hashIPFS = ipfsPromise.getIpfsHashFromBytes32(hash)
            // // console.log("hash: " + hashIPFS)
            // i'm storing the informations inside the description. We will retrieve them later.
            // console.error(payload == null)
            if(payload == null) { // first element of array
              payload = [{ load: hashIPFS, examUnicode: exUni, classUnicode: classUnicode, teacher: teac }, ]
            } else
              payload = [...payload,
                { load: hashIPFS, examUnicode: exUni, classUnicode: classUnicode, teacher: teac }
              ]
          }
        }
      } catch(error) {
        dError('Error while reading exams.', error)
        return reject(error)
      }
    }))
    try {
      // // console.log(payload)
      if(payload != null) {
        var newPayload = await processIPFSLoad(payload)
        newPayload.sort((a, b) => new Date(b.load.date) - new Date(a.load.date))
        // console.error('payload: ' + JSON.stringify(payload))
        return resolve(newPayload)
      } else return resolve(null)
    } catch(error) {
      dError('Error while reading ipfs informations.', error)
      return reject(error)
    }
  })
}

async function removeIfBooklet(classes, studentInstance, web3, coinbase) {
  return new Promise(async function (resolve, reject) {
    try {
      // // console.log(classes)
      var booklet = await studentInstance.booklet({ from: coinbase })
      if(booklet[0].length === 0) {
        return resolve(classes)
      } else {
        var i = 0
        var index = []
        for(let sclass of classes) {
          for(let j = 0; j < booklet[0].length; j++) {
            var bookletClass = web3.toUtf8(booklet[2][j])
            // console.log(bookletClass)
            // console.error(payload == null)
            if(bookletClass === sclass)
              index[i++] = classes.indexOf(sclass)
          }
        }
        for(let i = index.length - 1; i >= 0; i--) {
          // // console.log(index[i])
          classes.splice(index[i], 1)
        }
        // // console.log(classes)
        if(classes.length === 0) return resolve(null)
        return resolve(classes)
      }
    } catch(error) {
      dError('Error while removing booklet exams.', error)
      return reject(error)
    }
    // // console.log('REMOVE IF IN BOOKLET')

    // newClasses = classes
    // return resolve(newClasses)
  })
}

// async function removeIfMarked(examDataInstance, exams, coinbase, web3) {
//   // console.log('REMOVE IF MARKED')
//   var newExams
//   return new Promise(async function (resolve, reject) {
//     for(let exam of exams) {
//       try {
//         var hash = await examDataInstance.getResultHash(exam.examUnicode, { from: coinbase })
//         if(web3.toDecimal(hash) === 0) {
//           if(newExams == null) { // first element of array
//             newExams = [exam]
//           } else
//             newExams = [...newExams,
//               exam
//             ]
//         } else {
//           // console.log('No marks found!')
//         }
//       } catch(error) {
//         dError('Error while reading marks hash', error)
//         return reject(error)
//       }
//     }
//     return resolve(newExams)
//   })
// }

async function removeIfSubscribed(studentDataInstance, exams, badgeNumber, coinbase, web3) {
  // // console.log('REMOVE IF MARKED')
  return new Promise(async function (resolve, reject) {
    // var newExams
    try {
      var subscribedExams = await studentDataInstance.getSubscribedExams(badgeNumber, { from: coinbase })
    } catch(error) {
      dError('Error while reading marks hash', error)
      return reject(error)
    }
    var i = 0
    var index = []
    for(let exam of exams) {
      for(let subExam of subscribedExams) {
        // // console.log(web3.toUtf8(subExam) !== exam.examUnicode)
        // // console.log(web3.toUtf8(subExam))
        // // console.log(exam.examUnicode)
        if(web3.toUtf8(subExam) === exam.examUnicode) {
          // // console.log(exams.indexOf(exam))
          index[i++] = exams.indexOf(exam)
        }
      }
    }
    for(let i = index.length - 1; i >= 0; i--) {
      exams.splice(index[i], 1)
    }
    // // console.log(exams)
    return resolve(exams)
  })
}

function dError(text, error) {
  console.error(text)
  // console.log(error)
  store.dispatch(errorReadingData(req))
  thereWasAnError = true
  alert('There was an error while deploying contracts or reading infos. See the console log.')
}

export default function readExamsNoSubFromDatabase(badgeNumber) {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const Student = contract(StudentContract)
      Student.setProvider(web3.currentProvider)

      const studentData = contract(StudentDataContract)
      studentData.setProvider(web3.currentProvider)

      const sClass = contract(ClassContract)
      sClass.setProvider(web3.currentProvider)

      const Degree = contract(DegreeContract)
      Degree.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {

        dispatch(readingData(req))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        try { var studentInstance = await Student.deployed() } catch(error) {
          // If error, go to signup page.
          dError('Error while deploying studentData.', error)
          // return browserHistory.push('/profile')
        }

        try { var studentDataInstance = await studentData.deployed() } catch(error) {
          // If error, go to signup page.
          dError('Error while deploying studentData.', error)
          // return browserHistory.push('/profile')
        }

        try { var degreeInstance = await Degree.deployed() } catch(error) {
          dError('Error while deploying degree contract.')
        }

        try { var classInstance = await sClass.deployed() } catch(error) {
          dError('Error while deploying classData.')
        }
        if(!thereWasAnError) {
          try {
            var degree = await studentDataInstance.getStudentDegree(badgeNumber, { from: coinbase })
            if(degree.lenght === 0) dispatch(dataEmpty(req))
            else {
              try {
                var classes = await degreeInstance.getClasses(degree, { from: coinbase })
                if(classes.lenght === 0) dispatch(dataEmpty(req))
                else {
                  classes = classes.map(sclass => web3.toUtf8(sclass))
                  var noBookletClasses = await removeIfBooklet(classes, studentInstance, web3, coinbase)
                  if(noBookletClasses == null) dispatch(dataEmpty(req))
                  else {
                    try {
                      var exams = await readExams(classInstance, noBookletClasses, web3, coinbase)
                      if(exams == null) dispatch(dataEmpty(req))
                      else {
                        try {
                          var noSubscribedExams = await removeIfSubscribed(studentDataInstance, exams, badgeNumber, coinbase, web3)
                          if(noSubscribedExams == null) dispatch(dataEmpty(req))
                          else
                            return doAwesomeStuff(noSubscribedExams)
                        } catch(error) {
                          dError('Error while removing subscribed exams', error)
                        }
                      }
                    } catch(error) {
                      dError('Error in readExams.')
                    }
                  }
                }
              } catch(error) {
                dError('Error while reading classes.')
              }
            }
          } catch(error) {
            dError('Error while reading degree.\n')
          }
        }
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}