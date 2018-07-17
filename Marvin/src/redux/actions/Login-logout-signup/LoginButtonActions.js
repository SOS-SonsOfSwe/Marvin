import UniversityContract from '../../../../build/contracts/UserLogic.json'
import {
  browserHistory
} from 'react-router'
import store from '../../../store'
// import * as utils from '../../../utils/validations'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

import {
  userCostants
} from '../../reducers/costants'

import {
  ipfsReadingData,
  ipfsDataRead,
  ipfsErrorReadingData,
  ipfsNetworkError
} from '../StandardDispatches/readingData'

const contract = require('truffle-contract')

// function metamaskIsActive() {
//   return {
//     type: userCostants.TRYING_METAMASK
//   }
// }

function userLoggingIn() {
  return {
    type: userCostants.USER_LOGGING_IN
  }
}

function userLoggedIn(payload) {
  return {
    type: userCostants.USER_LOGGED_IN,
    payload: payload
  }
}

function doAwesomeStuff(dispatch, payload) {
  dispatch(userLoggedIn({
    payload
  }))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  return browserHistory.push('/profile') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function loginUser() {
  var web3 = store.getState()
    .web3.web3Instance

  // check if the user is logged in to metamask
  // the function has to return a function as is invoked by a dispatch
  if(web3.eth.accounts.length === 0) {
    alert("Please login to Metamask before!")
    return function (dispatch) {
      window.location.reload()
      return browserHistory.push('/')
    }
  } else return login(web3)
}

function login(web3, dispatch) {
  var payload = {
    name: '',
    surname: '',
    email: '',
    FC: '',
    tp: '',
    badgeNumber: '',
    image: ''
  }

  // Double-check web3's status.
  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // checkMetamask(web3)
      // .then((err, web3) => {
      // Using truffle-contract we create the authentication object.
      const university = contract(UniversityContract)
      university.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var universityInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        university.deployed()
          .then(function (instance) {
            universityInstance = instance

            // Attempt to login user.
            universityInstance.login({
                from: coinbase
              })
              .then(result => {

                // If no error, login user.
                payload.FC = web3.toUtf8(result[0]);
                payload.tp = web3.toDecimal(result[1]);
                payload.badgeNumber = web3.toDecimal(result[2]);

                // console.log("IPFS of the user:", ipfsPromise.getIpfsHashFromBytes32(result[3]))
                if(payload.tp !== 4) {
                  dispatch(userLoggingIn())
                  dispatch(ipfsReadingData())
                  var ipfs = new ipfsPromise()
                  // // console.log('Waiting for the data from IPFS...')
                  ipfs.getJSON(ipfsPromise.getIpfsHashFromBytes32(result[3]))
                    .then(jFile => {
                      //dispatch(userLoggingIn()) //dispatch waiting for data
                      // // console.log("jFile:", jFile)
                      payload.name = jFile.name;
                      payload.surname = jFile.surname;
                      payload.email = jFile.email;
                      payload.image = jFile.uploadedFile;
                      // console.log(jFile.uploadedFile)
                      // ipfs.getFile(jFile.uploadedFile)
                      //   .then(image => {
                      //     // console.log(image)
                      //     payload.image = image
                      //     return payload
                      //   })
                      //   .then((payload) => {

                      dispatch(ipfsDataRead())
                      // console.log(payload)
                      return doAwesomeStuff(dispatch, payload)
                      // })
                    })
                    .catch(err => {
                      // HERE I CATCH THE ERROR OF THE getJSON METHOD. JUST FOR TESTING
                      // // console.log('Fail:', err)
                      dispatch(ipfsErrorReadingData())
                      dispatch(ipfsNetworkError())
                      // alert('IPFS is not able to load your data. Pay attention to your network')
                    })

                } else
                  return doAwesomeStuff(dispatch, payload) //Repeating because of the asyncronous promises of the functions
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.error('Wallet ' + coinbase + ' does not have an account!')

                return browserHistory.push('/signup')
              })
          })
      })
      // })
      // .catch(err => {
      // alert('Login to Metamask before!')
      // browserHistory.push('/')
      // })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
// })
// }