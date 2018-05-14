import UniversityContract from '../../../../build/contracts/UserLogic.json' 
import { browserHistory } from 'react-router'
import store from '../../../store'
import * as utils from '../../../util/util'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
//function userLoggedIn(user) {
  function userLoggedIn(payload) { 
  return {
    type: USER_LOGGED_IN,
    //payload: user
    payload: payload
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  var payload = { 
    FC: '', 
    tp: '',
    badgeNumber: '' 
  } 

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const university = contract(UniversityContract) 
      university.setProvider(web3.currentProvider) 

      // Declaring this for later so we can chain functions on Authentication.
      var universityInstance 

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        university.deployed().then(function(instance) { 
          universityInstance = instance 

          // Attempt to login user.
          universityInstance.login({from: coinbase}) 
          .then( result => {
            // If no error, login user.
            //let [nam,surnam] = result.call(2);
            //var nm = web3.toUtf8(nam);
            //var srnm = web3.toUtf(surnam);

            payload.FC = web3.toUtf8(result[0]); 
            payload.tp = web3.toDecimal(result[1]);
            payload.badgeNumber = web3.toDecimal(result[2]); 

            //var userName = web3.utils.toUtf8(result)

            //dispatch(userLoggedIn({"name": userName}))
           dispatch(userLoggedIn({payload})) 

            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            // var currentLocation = browserHistory.getCurrentLocation()

            var currentLocation = browserHistory.getCurrentLocation() 

           if ('redirect' in currentLocation.query)
           {
             return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
             }

             return browserHistory.push('/profile') | alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
