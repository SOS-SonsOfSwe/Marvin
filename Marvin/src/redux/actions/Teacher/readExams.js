import "regenerator-runtime/runtime"; // needed for async calls
import ClassContract from '../../../../build/contracts/ClassData'
import ExamDataContract from '../../../../build/contracts/ExamData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { EXAMS as req } from "../../reducers/costants/teacherCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
  errorReadingData
} from '../StandardDispatches/readingData'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load) {
  dispatch(dataRead({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  // return browserHistory.push('/profile/degrees') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

async function removeVotedExams(payload, examData, web3) {
  return new Promise(function (resolve, reject) {
    examData.deployed()
      .then(examDataInstance => {

        // return new Promise(function (resolve, reject) {
        var filteredPayload

        payload.map((element, i, payload) => {
          return examDataInstance.getResultHash(element.examUnicode)
            .then(hash => {
              if(web3.toDecimal(hash) === 0) {
                // // console.log('element:' + JSON.stringify(element))
                if(filteredPayload == null)
                  filteredPayload = [element]
                else filteredPayload = [...filteredPayload,
                  element
                ]
                // console.error("filteredPayload: " + JSON.stringify(filteredPayload))

              }
              if(payload.length - 1 === i)
                return resolve(filteredPayload)
              return filteredPayload
            })
            .catch(function (error) {
              // If error, go to signup page.
              console.error('Error while getting result hash.\n')
              // console.log(error)
              return reject(error)
              // dispatch(errorReadingData(req))
            })
        })
      })
      .catch(function (error) {
        // If error, go to signup page.
        console.error('Error while deploying examData.\n')
        // console.log(error)
        return reject(error)
      })
  })
}

async function processIPFSResultParallel(ipfs, payload) {
  const promises = payload.map(async item => {
    try {
      item.load = await ipfs.getJSON(item.load)
    } catch(error) {
      console.error('Error while reading ipfs')
    }
  })
  await Promise.all(promises)
}

export function readExamsFromDatabase(classUnicode) {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const Class = contract(ClassContract)
      Class.setProvider(web3.currentProvider)

      const examData = contract(ExamDataContract)
      examData.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var classInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {

        dispatch(readingData(req))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        Class.deployed()
          .then(function (instance) {
            classInstance = instance

            // Attempt to read exams per class/class
            classInstance.getClassExamsData(classUnicode, { from: coinbase })
              // .then(// console.log)
              .then(result => {
                // console.log('EXAMS READ RESULT: ')
                // console.log(result)

                // checking if the blockchain is empty for this kind of data.
                // when the blockchain is empty the first numbers it retrieves are:
                // 0x00000. When it's full it's 0xsomething. So we check the first number
                // after "x" to be not equal to zero.
                // // console.log(web3.toUtf8(result[0]))
                // for degree result[0] is the actual array of unicodes of the degree
                // result[1] is the list of its respectively IPFS hash
                // // console.log('web3ToHex: ' + web3.toHex(result[0][0]))

                // // console.log(result[0].length === 0)
                // console.error(result[0].length === 0)
                if(result[0].length === 0) {
                  dispatch(dataEmpty(req))
                } else {

                  // // console.log('result[0] : ' + web3.toHex(result[0]))

                  var payload
                  var i = 0;
                  // export var classes = [{
                  //   year: "2017-2018",
                  //   degreeUnicode: "MAT/INF17",
                  //   classData: {
                  //     'description': "Reti e sicurezza"
                  //   },
                  //   classUnicode: 'RETISICU17'
                  // }]

                  // Just read all the information inside the blockchain.
                  // It is better to read all the infos together without doing
                  // much conversions because we can close the communication
                  // with the blockchain faster
                  var hashIPFS
                  for(i; i < result[0].length; i++) {
                    var exam = result[2][i]
                    var hash = result[0][i]
                    var teac = web3.toDecimal(result[1][i])
                    // // console.log("teacher: " + teac)
                    var exUni = web3.toUtf8(exam)
                    // // console.log('dgr: ' + dgr)
                    hashIPFS = ipfsPromise.getIpfsHashFromBytes32(hash)
                    // i'm storing the informations inside the description. We will retrieve them later.
                    if(i === 0) { // first element of array
                      payload = [{ load: hashIPFS, examUnicode: exUni, teacher: teac }, ]
                    } else
                      payload = [...payload,
                        { load: hashIPFS, examUnicode: exUni, teacher: teac }
                      ]
                  }
                  removeVotedExams(payload, examData, web3)
                    .then(payload => {
                      // console.error('payload outside: ' + payload)
                      // this function provides a parallel loading of all the informations from ipfs. 
                      // It renders the data all together: an interesting improvement will be to load the data
                      // per parts so in case of some ipfs file failure the app is still working
                      if(payload != null) {
                        var ipfs = new ipfsPromise()
                        processIPFSResultParallel(ipfs, payload)
                          .then(result => {
                            payload.sort((a, b) => b.examUnicode - a.examUnicode)
                            return doAwesomeStuff(dispatch, payload)
                          })
                          .catch(function (error) {
                            // If error, go to signup page.
                            console.error('Error while reading ipfs informations.')
                            // console.log(error)
                            dispatch(errorReadingData(req))
                            // return browserHistory.push('/profile')
                          })
                      } else dispatch(dataEmpty(req))
                    })
                }
              })
              .catch(function (result) {
                // If error, go to signup page.
                // console.error('Error while reading infos: ' + result)
                // console.error('Wallet ' + coinbase + 'encountered an error!')
                // dispatch(eraseAdminReducerInfo())
                // dispatch(eraseIpfsReducerInfo())
                return browserHistory.push('/profile')
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}