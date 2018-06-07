import AdminContract from '../../../../build/contracts/Admin'
import {
  browserHistory
} from 'react-router'
import store from '../../../store'

import { addingData, errorAddingData, dataAdded } from '../StandardDispatches/addingData'

const contract = require('truffle-contract')

export default function addNewAcademicYear(year) {
  // thinking as year = 2014-2015 we want to take only the first two int so we can send 
  // them to the solidity contract and risparmiare

  let web3 = store.getState()
    .web3.web3Instance

  // Double-check web3's status.
  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const admin = contract(AdminContract)
      admin.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var adminIstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        admin.deployed()
          .then(instance => {
            adminIstance = instance
            // dispatching action for make the reducer know we are making the transaction
            dispatch(addingData())

            //taking the first 4 numbers
            year = year.slice(0, 4)
            //be careful!! This number cannot be over 4095 or it starts again from 1.
            adminIstance.addNewYear(year, { from: coinbase })
              .then(result => {
                // result.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
                // console.log(JSON.stringify(result))
                dispatch(dataAdded())
                alert('The new academic year has been added! Wait some seconds to make it write on blockchain.')
              })
              .catch(error => {
                dispatch(errorAddingData())
              })
              .finally(def => {
                // console.log(JSON.stringify(def))
                return browserHistory.push('/profile')
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}