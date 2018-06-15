import AdminContract from '../../../../build/contracts/Admin'
import Units from 'ethereumjs-units'
import ethPrice from 'eth-price'
import {
  browserHistory
} from 'react-router'
import store from '../../../store'

// this are standard dispatches: feel free to use them. The meaning is obvious, those are not taking any parameter.
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

      var gasPrice
      admin.web3.eth.getGasPrice((error, result) => gasPrice = Number(result))

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

            var estimatedGas
            var costOperationWei
            var costOperationEth
            var costOperationUsd

            adminIstance.addNewYear.estimateGas(year)
              .then(result => {
                estimatedGas = result
                costOperationWei = estimatedGas * gasPrice
                costOperationEth = Units.convert(costOperationWei, 'wei', 'eth')
                console.log('estimateGas: ' + estimatedGas)
                console.log('Cost of the operation in Wei: ' + costOperationWei)
                console.log('Cost of the operation in Ether: ' + costOperationEth)
                ethPrice('EUR')
                  .then(ethInEur => {
                    ethInEur = parseFloat(ethInEur[0]
                      .slice(5))
                    costOperationUsd = ethInEur * costOperationEth
                    console.error('Cost of the operation in EUR: ' + costOperationUsd)
                  })

              })

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
                // alert('The new academic year has been added! Wait some seconds to make it write on blockchain.')
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