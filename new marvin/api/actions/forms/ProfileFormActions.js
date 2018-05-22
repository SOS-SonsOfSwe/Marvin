import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import store from '../../../src/store'

const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(name, surname) {
  return {
    type: USER_UPDATED,
    payload: name, surname
  }
}

export function updateUser(name, surname) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login user.
          authenticationInstance.update(name, surname, {from: coinbase})
          .then(function(result) {
            // If no error, update user.
            //var nm = web3.utils.toUtf8(result[0]);
            //var srnm = web3.utils.toUtf8(result[1]);
            
            dispatch(userUpdated({
              "name": name,
              "surname": surname
            }))

            return alert('Data updated!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
