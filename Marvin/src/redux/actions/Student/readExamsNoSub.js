/*jshint loopfunc:true*/
import "regenerator-runtime/runtime"; // needed for async calls
import DegreeContract from '../../../../build/contracts/DegreeData'
import ClassContract from '../../../../build/contracts/ClassData'
import StudentDataContract from '../../../../build/contracts/StudentData'
import ExamDataContract from '../../../../build/contracts/ExamData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { EXAMS as req } from "../../reducers/costants/studentCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
  errorReadingData
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
  const promises = payload.map(async item =>
    item.load = await ipfs.getJSON(item.load)
    // here I overwrite the description information with the JSON returning from the ipfs
  )
  await Promise.all(promises)
}

async function readExams(classInstance, classes, web3, coinbase) {
  var payload
  return new Promise(function (resolve, reject) { // for(let sclass of classes)
    classes.map(async sclass => {
      // var payloadToReturn
      var classUnicode = web3.toUtf8(sclass)
      try {
        var result = await classInstance.getClassExamsData(classUnicode, { from: coinbase })

        // result[0] = examHashcode
        // result[1] = examsTeacher
        // result[2] = examUnicode

        // console.log('EXAMS READ RESULT: ')
        // console.log(result)

        if(result[0].length === 0) {
          return payload
        } else {

          var hashIPFS
          for(let j = 0; j < result[0].length; j++) {
            var exam = result[2][j]
            var hash = result[0][j]
            var teac = web3.toDecimal(result[1])
            // console.log("teacher: " + teac)
            var exUni = web3.toUtf8(exam)
            // console.log('dgr: ' + dgr)
            hashIPFS = ipfsPromise.getIpfsHashFromBytes32(hash)
            // console.log("hash: " + hashIPFS)
            // i'm storing the informations inside the description. We will retrieve them later.
            // console.error(payload == null)
            if(payload == null) { // first element of array
              payload = [{ load: hashIPFS, examUnicode: exUni, classUnicode: classUnicode, teacher: teac }, ]
            } else
              payload = [...payload,
                { load: hashIPFS, examUnicode: exUni, classUnicode: classUnicode, teacher: teac }
              ]
          }
          try {
            await processIPFSLoad(payload)
            payload.sort((a, b) => b.load.date - a.load.date)
            // console.error('payload: ' + JSON.stringify(payload))
            return resolve(payload)
          } catch(error) {
            dError('Error while reading ipfs informations.', error)
            return reject(error)
          }
        }
      } catch(error) {
        dError('Error while reading exams.', error)
        return reject(error)
      }
    })
  })
}

async function setIfMarked(examDataInstance, exams, badgeNumber, coinbase, web3) {
  var ipfs = new ipfsPromise()
  return new Promise(async function (resolve, reject) {
    for(let exam of exams) {
      try {
        var hash = await examDataInstance.getResultHash(exam.examUnicode, { from: coinbase })
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
            return reject(error)
          }
          return resolve(exams)

        } else {
          console.log('No marks found!')
        }
      } catch(error) {
        dError('Error while reading marks', error)
        return reject(error)
      }
      return resolve(exams)
    }
  })
}

function dError(text, error) {
  console.error(text)
  console.log(error)
  store.dispatch(errorReadingData(req))
  thereWasAnError = true
  alert('There was an error while deploying contracts or reading infos. See the console log.')
}

export function readExamsNoSubFromDatabase(badgeNumber) {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
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
        try { var examDataInstance = await ExamData.deployed() } catch(error) {
          dError('Error while deploying examData.')
        }
        if(!thereWasAnError) {
          try {
            var degree = await studentDataInstance.getStudentDegree(badgeNumber, { from: coinbase })
            try {
              var classes = await degreeInstance.getClasses(degree, { from: coinbase })
              try {
                var exams = await readExams(classInstance, classes, web3, coinbase)
                if(exams == null) dispatch(dataEmpty(req))
                else {
                  try {
                    var markedExams = await setIfMarked(examDataInstance, exams, badgeNumber, coinbase, web3)
                    // console.log('Exams with marks: ' + JSON.stringify(markedExams))
                    return doAwesomeStuff(markedExams)
                  } catch(error) {
                    dError('Error while setting marks on exams', error)
                  }
                }
              } catch(error) {
                dError('Error in readExams.')
              }
            } catch(error) {
              dError('Error while reading classes.')
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