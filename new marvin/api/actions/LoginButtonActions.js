import UniversityContract from '../../build/contracts/UserLogic.json'
import {
  browserHistory
} from 'react-router'
import store from '../../src/store'
import * as utils from '../../src/utils/validations'

import ipfsPromise from '../utils/ipfsPromise'

const contract = require('truffle-contract')

import {
  USER_LOGGED_IN,
  USER_LOGGING_IN
} from '../../src/redux/reducers/costants'

// export const USER_LOGGED_IN = 'USER_LOGGED_IN'
// export const USER_LOGGING_IN = 'USER_LOGGING_IN'

function userLoggingIn() {
  return {
    type: USER_LOGGING_IN
  }
}

function userLoggedIn(payload) {
  return {
    type: USER_LOGGED_IN,
    payload: payload
  }
}

function doAwsomeStuff(dispatch, payload) {
  console.log('Waiting 5s before logging the user')
  setTimeout(() => dispatch(userLoggedIn({
    payload
  })), 5000)
  // var currentLocation = browserHistory.getCurrentLocation()
  // if('redirect' in currentLocation.query) {
  //   return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
  // }
  // return browserHistory.push('/profile') || alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function loginUser() {
  let web3 = store.getState()
    .web3.web3Instance

  var payload = {
    name: '',
    surname: '',
    email: '',
    FC: '',
    tp: '',
    badgeNumber: ''
  }

  // Double-check web3's status.
  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
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

                console.log("result[3]:", ipfsPromise.getIpfsHashFromBytes32(result[3]))
                if(payload.tp !== 4) {
                  var ipfs = new ipfsPromise()
                  ipfs.getJSON(ipfsPromise.getIpfsHashFromBytes32(result[3]))
                    .then(jFile => {
                      //dispatch(userLoggingIn()) //dispatch waiting for data
                      console.log("jFile:", jFile)
                      payload.name = jFile.name;
                      payload.surname = jFile.surname;
                      payload.email = jFile.email;
                      return doAwsomeStuff(dispatch, payload)
                    })
                    .catch(err => {
                      // HERE I CATCH THE ERROR OF THE getJSON METHOD. JUST FOR TESTING
                      // console.log('Fail:', err)
                      dispatch(userLoggingIn())
                    })
                  dispatch(userLoggingIn())
                } else
                  return doAwsomeStuff(dispatch, payload) //Repeating because of the asyncronous promises of the functions
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.error('Wallet ' + coinbase + ' does not have an account!')

                //   return browserHistory.push('/signup')
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}