/*jshint loopfunc:true*/
import "regenerator-runtime/runtime"; // needed for async calls
// import DegreeContract from '../../../../build/contracts/DegreeData'
// import ClassContract from '../../../../build/contracts/ClassData'
import StudentContract from '../../../../build/contracts/Student'
// import StudentDataContract from '../../../../build/contracts/StudentData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { BOOKLET as req } from "../../reducers/costants/studentCostants";

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

// var thereWasAnError = false

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

function dError(text, error) {
  console.error(text)
  // console.log(error)
  store.dispatch(errorReadingData(req))
  //   thereWasAnError = true
  alert('There was an error while deploying contracts or reading infos. See the console log.')
}

export default function readBooklet() {

  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {

      // Using truffle-contract we create the authentication object.
      const Student = contract(StudentContract)
      Student.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {

        dispatch(readingData(req))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }
        var booklet
        var allIsBroken = false
        try {
          var studentInstance = await Student.deployed()
          try {
            var bookletClasses = await studentInstance.booklet({ from: coinbase })
            // console.log("booklet from blockchain: ")
            // console.log(bookletClasses)
            if(bookletClasses[0].length === 0) dispatch(dataEmpty(req))
            else {
              var hashIPFS
              for(let j = 0; j < bookletClasses[0].length; j++) {
                var mark = web3.toDecimal(bookletClasses[1][j])
                var hash = bookletClasses[0][j]
                var classUnicode = web3.toUtf8(bookletClasses[2][j])
                if(parseInt(web3.toDecimal(hash), 10) === 0) allIsBroken = true
                else {
                  hashIPFS = ipfsPromise.getIpfsHashFromBytes32(hash)

                  if(booklet == null) { // first element of array
                    booklet = [{ load: hashIPFS, classUnicode: classUnicode, mark: mark }, ]
                  } else
                    booklet = [...booklet,
                      { load: hashIPFS, classUnicode: classUnicode, mark: mark }
                    ]
                }

              }
              if(!allIsBroken) {
                try {
                  var processedBooklet = await processIPFSLoad(booklet)
                  return doAwesomeStuff(processedBooklet)
                  // // console.log(processedBooklet)
                } catch(error) {
                  dError('Error while processing ipfs infos', error)
                }
              } else dispatch(dataEmpty(req))
            }

          } catch(error) {
            dError('Error while retrieving booklet', error)
          }

        } catch(error) {
          // If error, go to signup page.
          dError('Error while deploying studentData.', error)
          // return browserHistory.push('/profile')
        }

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}