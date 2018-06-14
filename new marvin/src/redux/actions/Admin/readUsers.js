import "regenerator-runtime/runtime"; // needed for async calls
import AdminContract from '../../../../build/contracts/Admin'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { TEACHERS, STUDENTS, ADMINS } from "../../reducers/costants/adminCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
} from '../StandardDispatches/readingData'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load, userValue) {
  dispatch(dataRead({ load }, userValue))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  // return browserHistory.push('/profile/admin-courses') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

async function processIPFSResultParallel(ipfs, payload) {
  const promises = payload.map(item => {
    // checking for the hash which has not to be null
    if(item.load === null) return null
    else return ipfs.getJSON(item.load)
      .then(result => {
        // here I overwrite the description information with the JSON returning from the ipfs.
        // PAY ATTENTION: the payload is the same as the login, so look over there to catch the right info!
        item.load = result
      })
  })
  await Promise.all(promises)
}

export function readUsersFromDatabase(userType) {
  var userValue
  switch(userType) {
  case 'admin':
    {
      userType = 1
      userValue = ADMINS
      break
    }
  case 'teacher':
    {
      userType = 2
      userValue = TEACHERS
      break
    }
  case 'student':
    {
      userType = 3
      userValue = STUDENTS
      break
    }
  default:
    {
      userType = 0
      break
    }
  }
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const admin = contract(AdminContract)
      admin.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var adminInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {

        dispatch(readingData(userValue))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        admin.deployed()
          .then(function (instance) {
            adminInstance = instance

            // Attempt to read admin courses per year
            adminInstance.getUsersData({ from: coinbase })
              // .then(console.log)
              .then(result => {
                console.log('USER DATA READ RESULT: ')
                console.log(result)

                if(result[0].length === 0) {
                  dispatch(dataEmpty(userValue))
                } else {
                  // console.log('result[0] : ' + web3.toHex(result[0]))

                  // SEE HERE FOR WHAT YOU HAVE TO LOOK FOR!!
                  // result is made in this way:
                  // result[0]: hash
                  // result[1]: badgeNumber
                  // result[2]: userType
                  // result[3]: isSignedUp
                  // so payload will be:
                  // payload = [{'payload':result[0]}, 
                  //            {'badgeNumber':web3.toUtf8(result[1])},
                  //            {'isSignedUp':'isSignedUp}
                  // ]
                  // Then we will treat the hash with all the nested informations, as it contains:
                  //   payload = {
                  //     name: '',
                  //     surname: '',
                  //     email: '',
                  //     FC: '',
                  //     tp: '',
                  //     badgeNumber: ''
                  //   }

                  var payload
                  let i = 0;

                  // Just read all the information inside the blockchain.
                  // It is better to read all the infos together without doing
                  // much conversions because we can close the communication
                  // with the blockchain faster
                  for(i; i < result[0].length; i++) {
                    // console.log('web3.toDecimal(result[2]): ' + web3.toDecimal(result[2]))
                    // console.log('ipfsPromise.getIpfsHashFromBytes32(result[0][i]): ' + ipfsPromise.getIpfsHashFromBytes32(result[0][i]))
                    // console.log('web3.toDecimal(result[1][i]): ' + web3.toDecimal(result[1][i]))
                    // console.log('web3.toDecimal(result[3][i]): ' + web3.toDecimal(result[3][i]))
                    // console.log('userType: ' + userType, 'web3.toDecimal(result[2]): ' + web3.toDecimal(result[2]))
                    // console.log('if result ' + (userType === web3.toDecimal(result[2])))
                    if(userType === web3.toDecimal(result[2][i])) {
                      var hash = result[0][i].toString()
                        .slice(0, 5)
                      // console.error(hash)
                      var hashIPFS
                      if(hash.toString() !== '0x000')
                        hashIPFS = ipfsPromise.getIpfsHashFromBytes32(result[0][i])
                      else hashIPFS = null
                      var badgeNumber = web3.toDecimal(result[1][i])
                      var isSignedUp = (result[3][i])

                      // console.log("admin: " + admin)
                      // console.log('dgr: ' + dgr)

                      // i'm storing the informations inside the description. We will retrieve them later.
                      if(i === 0) { // first element of array
                        payload = [{ load: hashIPFS, badgeNumber: badgeNumber, isSignedUp: isSignedUp }, ]
                      } else
                        payload = [...payload,
                          { load: hashIPFS, badgeNumber: badgeNumber, isSignedUp: isSignedUp }
                        ]
                    }
                  }
                  // this function provides a parallel loading of all the informations from ipfs. 
                  // It renders the data all together: an interesting improvement will be to load the data
                  // per parts so in case of some ipfs file failure the app is still working
                  var ipfs = new ipfsPromise()
                  processIPFSResultParallel(ipfs, payload)
                    .then(result => {
                      payload.sort((a, b) => b.badgeNumber - a.badgeNumber)
                      return doAwesomeStuff(dispatch, payload, userValue)
                    })

                }
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.error('Error while reading infos: ' + result)
                console.error('Wallet ' + coinbase + 'encountered an error!')
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