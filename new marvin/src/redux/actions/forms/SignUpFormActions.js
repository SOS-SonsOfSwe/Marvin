import UniversityContract from '../../../../build/contracts/UserLogic.json'
import {
  loginUser
} from '../../../components'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(userData, hashIPFS) {
  let web3 = store.getState()
    .web3.web3Instance

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

            // Attempt to register user.
            universityInstance.registerUser(userData.FC, userData.UC, hashIPFS, {
                from: coinbase
              })
              .then(function (result) {

                // If no error, login user.
                return dispatch(loginUser())
              })
              .catch(function (result) {
                // If error...
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}