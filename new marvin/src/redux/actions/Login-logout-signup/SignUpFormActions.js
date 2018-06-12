import UniversityContract from '../../../../build/contracts/UserLogic.json'
import { loginUser } from './LoginButtonActions'
import store from '../../../store'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

import {
  addingData,
  errorAddingData,
  dataAdded,
  ipfsAddingData,
  ipfsDataAdded,
  ipfsErrorAddingData,
  ipfsNetworkError
} from '../StandardDispatches/addingData'

const contract = require('truffle-contract')

export function signUpUser(userData) {
  var ipfs = new ipfsPromise()

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

            dispatch(ipfsAddingData())
            dispatch(addingData())

            ipfs.pushJSON(userData)
              .then(hashIPFS => {

                dispatch(ipfsDataAdded())

                var hash = ipfsPromise.getBytes32FromIpfsHash(hashIPFS)
                universityInstance = instance

                // Attempt to register user.
                universityInstance.signUp(userData.FC, userData.UC, hash, { from: coinbase })
                  .then(function (result) {
                    dispatch(dataAdded())
                    // If no error, login user.
                    return dispatch(loginUser())
                  })
                  .catch(function (result) {
                    dispatch(errorAddingData())
                  })
              })
              .catch(err => {
                dispatch(ipfsErrorAddingData())
                dispatch(ipfsNetworkError())
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}