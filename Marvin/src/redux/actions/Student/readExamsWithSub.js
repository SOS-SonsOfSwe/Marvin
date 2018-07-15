/*jshint loopfunc:true*/
import "regenerator-runtime/runtime"; // needed for async calls
import DegreeContract from '../../../../build/contracts/DegreeData'
import ClassContract from '../../../../build/contracts/ClassData'
import StudentContract from '../../../../build/contracts/Student'
import StudentDataContract from '../../../../build/contracts/StudentData'
import ExamDataContract from '../../../../build/contracts/ExamData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { SUBSCRIBED_EXAMS as req } from "../../reducers/costants/studentCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
  errorReadingData,
  ipfsReadingData,
  ipfsDataRead,
  ipfsErrorReadingData,
  ipfsNetworkError
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

async function processIPFSLoad(payload) {
  var ipfs = new ipfsPromise()
  return new Promise(async (resolve, reject) => {
    // for(var item of payload) {
    store.dispatch(ipfsReadingData())
    await Promise.all(payload.map(async (item, i, payload) => {
      try {

        return(
          item.load = await ipfs.getJSON(item.load),
          item.classUnicode = item.load.classUnicode
        )
      } catch(error) {
        dError('Error during processing ipfs exam informations', error)
        store.dispatch(ipfsErrorReadingData())
        store.dispatch(ipfsNetworkError())
        return reject(error)
      }
      // here I overwrite the description information with the JSON returning from the ipfs
    }))
    // console.log(payload)
    store.dispatch(ipfsDataRead())
    return resolve(payload)
  })
}

// async function readExams(classInstance, classes, web3, coinbase) {
//   var payload
//   return new Promise(async function (resolve, reject) { // for(let sclass of classes)
//     await Promise.all(classes.map(async sclass => {
//       // var payloadToReturn
//       var classUnicode = web3.toUtf8(sclass)
//       try {
//         var result = await classInstance.getClassExamsData(classUnicode, { from: coinbase })

//         // result[0] = examHashcode
//         // result[1] = examsTeacher
//         // result[2] = examUnicode

//         // console.log('EXAMS READ RESULT: ')
//         // console.log(result)

//         if(result[0].length === 0) {
//           return payload
//         } else {

//           var hashIPFS
//           for(let j = 0; j < result[0].length; j++) {
//             var exam = result[2][j]
//             var hash = result[0][j]
//             var teac = web3.toDecimal(result[1])
//             // console.log("teacher: " + teac)
//             var exUni = web3.toUtf8(exam)
//             // console.log('dgr: ' + dgr)
//             hashIPFS = ipfsPromise.getIpfsHashFromBytes32(hash)
//             // console.log("hash: " + hashIPFS)
//             // i'm storing the informations inside the description. We will retrieve them later.
//             // console.error(payload == null)
//             if(payload == null) { // first element of array
//               payload = [{ load: hashIPFS, examUnicode: exUni, classUnicode: classUnicode, teacher: teac }, ]
//             } else
//               payload = [...payload,
//                 { load: hashIPFS, examUnicode: exUni, classUnicode: classUnicode, teacher: teac }
//               ]
//           }

//         }
//       } catch(error) {
//         dError('Error while reading exams.', error)
//         return reject(error)
//       }
//     }))
//     try {
//       if(payload != null) {
//         var newPayload = await processIPFSLoad(payload)
//         newPayload.sort((a, b) => new Date(b.load.date) - new Date(a.load.date))
//         // console.error('payload: ' + JSON.stringify(payload))
//         return resolve(newPayload)
//       } else return resolve(null)
//     } catch(error) {
//       dError('Error while reading ipfs informations.', error)
//       return reject(error)
//     }
//   })
// }

async function loadIPFSInfos(examDataInstance, subscribedExams, web3, coinbase) {

  // var examHashIPFS
  // var load
  // var ipfs = new ipfsPromise()
  return new Promise(async function (resolve, reject) { // for(let sclass of classes)
    var newExams = []
    // var i = 0
    // store.dispatch(ipfsReadingData())
    await Promise.all(subscribedExams.map(async subExamUnicode => {
      // var payloadToReturn
      // var classUnicode = web3.toUtf8(sclass)
      try {
        var load = ipfsPromise.getIpfsHashFromBytes32(await examDataInstance.getHashData(subExamUnicode, { from: coinbase }))
      } catch(error) {
        dError('Error while reading exams.', error)
        return reject(error)
      }
      if(newExams == null) {
        newExams = [{ examUnicode: web3.toUtf8(subExamUnicode), load: load }]
      } else {
        newExams = [...newExams,
          { examUnicode: web3.toUtf8(subExamUnicode), load: load }
        ]
      }
      // console.log(newExams)
      // newExams[i].examUnicode = subExamUnicode
      // newExams[i].load = load
      // var examHashIPFS = ipfsPromise.getIpfsHashFromBytes32(examHash)

      // try {
      //   // var load = await ipfs.getJSON(examHashIPFS)
      // } catch(error) {
      //   dError('Error while reading ipfs exams infos', error)
      //   store.dispatch(ipfsErrorReadingData())
      //   store.dispatch(ipfsNetworkError())
      //   return reject(error)
      // }

      // newExams[i++].classUnicode = load.classUnicode
      // result[0] = examHashcode
      // result[1] = examsTeacher
      // result[2] = examUnicode

      // console.log('EXAMS READ RESULT: ')
      // console.log(result)

    }))

    // if(newExams != null) {
    newExams = await processIPFSLoad(newExams)
    // newExams.sort((a, b) => new Date(b.load.date) - new Date(a.load.date))
    // console.error('payload: ' + JSON.stringify(payload))
    return resolve(newExams)

  })
}

async function removeIfBooklet(exams, studentInstance, web3, coinbase) {
  return new Promise(async function (resolve, reject) {
    try {
      var booklet = await studentInstance.booklet({ from: coinbase })

      if(booklet[0].length === 0) {
        return resolve(exams)
      } else {
        var i = 0
        var index = []
        for(let sclass of exams) {
          for(let j = 0; j < booklet[0].length; j++) {
            // var exam = booklet[2][j]
            // var hash = booklet[0][j]
            // var teac = web3.toDecimal(booklet[1])
            // console.log("teacher: " + teac)
            var bookletClass = web3.toUtf8(booklet[2][j])
            // console.error(payload == null)
            if(bookletClass === sclass.classUnicode)
              index[i++] = exams.indexOf(sclass)
            // if(newClasses == null) { // first element of array
            //   newClasses = [sclass]
            // } else
            //   newClasses = [...newClasses,
            //     sclass
            //   ]
          }
        }
        for(let i = index.length - 1; i >= 0; i--) {
          exams.splice(index[i], 1)
        }
        if(exams.length === 0) return resolve(null)
        return resolve(exams)
      }
    } catch(error) {
      dError('Error while removing booklet exams.', error)
      return reject(error)
    }
    // console.log('REMOVE IF IN BOOKLET')

    // newClasses = classes
    // return resolve(newClasses)
  })
}

async function setIfMarked(examDataInstance, exams, badgeNumber, coinbase, web3) {
  var ipfs = new ipfsPromise()
  store.dispatch(ipfsReadingData())
  return new Promise(async function (resolve, reject) {
    for(let exam of exams) {
      try {
        // console.log(exam.examUnicode)
        var hash = await examDataInstance.getResultHash(exam.examUnicode, { from: coinbase })
        // console.log(hash)
        if(web3.toDecimal(hash) !== 0) {
          hash = ipfsPromise.getIpfsHashFromBytes32(hash)
          try {
            var marks = await ipfs.getJSON(hash)
            marks.forEach(mark => {
              if(mark.badgeNumber === badgeNumber) {
                exam.mark = mark.vote
                return
              }
            })
          } catch(error) {
            dError('Error while reading hash of marks', error)
            store.dispatch(ipfsErrorReadingData())
            store.dispatch(ipfsNetworkError())
            return reject(error)
          }
        } else {
          // console.log('No marks found!')
        }
      } catch(error) {
        dError('Error while reading marks', error)
        store.dispatch(ipfsErrorReadingData())
        store.dispatch(ipfsNetworkError())
        return reject(error)
      }
    }
    store.dispatch(ipfsDataRead())
    return resolve(exams)
  })
}

function dError(text, error) {
  console.error(text)
  console.log(error)
  store.dispatch(errorReadingData(req))
  thereWasAnError = true
  alert('There was an error while deploying contracts or reading infos. See the console log.')
}

export function readMarkedExamsFromDatabase(badgeNumber) {
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

      const ExamData = contract(ExamDataContract)
      ExamData.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {

        dispatch(readingData(req))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        try { var studentInstance = await Student.deployed() } catch(error) {
          dError('Error while deploying studentData.', error)
        }

        try { var studentDataInstance = await studentData.deployed() } catch(error) {
          dError('Error while deploying studentData.', error)
        }

        // try { var degreeInstance = await Degree.deployed() } catch(error) {
        //   dError('Error while deploying degree contract.')
        // }

        // try { var classInstance = await sClass.deployed() } catch(error) {
        //   dError('Error while deploying classData.')
        // }
        try { var examDataInstance = await ExamData.deployed() } catch(error) {
          dError('Error while deploying examData.')
        }
        if(!thereWasAnError) {
          try {
            var subscribedExams = await studentDataInstance.getSubscribedExams(badgeNumber, { from: coinbase })
            if(subscribedExams.length === 0) dispatch(dataEmpty(req))
            else {
              try {
                subscribedExams = await loadIPFSInfos(examDataInstance, subscribedExams, web3, coinbase)
                try {
                  var markedSubscribedExams = await setIfMarked(examDataInstance, subscribedExams, badgeNumber, coinbase, web3)

                  try {
                    var noBookletExams = await removeIfBooklet(markedSubscribedExams, studentInstance, web3, coinbase)
                    if(noBookletExams == null) dispatch(dataEmpty(req))
                    else
                      return doAwesomeStuff(noBookletExams)
                  } catch(error) { dError('Error while removing booklet exams', error) }
                } catch(error) {
                  dError('Error while setting marks on exams', error)
                }

              } catch(error) {
                dError('Error while retrieving ipfs subscribed exams infos', error)
              }
            }

          } catch(error) {
            dError('Error while reading subscribed exams', error)
          }
          // try {
          //   var degree = await studentDataInstance.getStudentDegree(badgeNumber, { from: coinbase })
          //   try {
          //     var classes = await degreeInstance.getClasses(degree, { from: coinbase })
          //     if(classes != null) {
          //       var noBookletClasses = await removeIfBooklet(classes, studentInstance, web3, coinbase)
          //       try {
          //         var exams = await readExams(classInstance, noBookletClasses, web3, coinbase)
          //         if(exams == null) dispatch(dataEmpty(req))
          //         else {
          //           try {
          //             var markedExams = await removeNoMarked(examDataInstance, exams, badgeNumber, coinbase, web3)
          //             if(markedExams != null)
          //               return doAwesomeStuff(markedExams)
          //             else dispatch(dataEmpty(req))
          //           } catch(error) {
          //             dError('Error while setting marks on exams', error)
          //           }
          //         }
          //       } catch(error) {
          //         dError('Error in readExams.')
          //       }
          //     }
          //   } catch(error) {
          //     dError('Error while reading classes.')
          //   }
          // } catch(error) {
          //   dError('Error while reading degree.\n')
          // }
        }
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}