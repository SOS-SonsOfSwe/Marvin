import StudentContract from '../../../../build/contracts/Student'
import { browserHistory } from 'react-router'
import store from '../../../store'

// this are standard dispatches: feel free to use them. The meaning is obvious, those are not taking any parameter.
import { addingData, errorAddingData, dataAdded } from '../StandardDispatches/addingData'

const contract = require('truffle-contract')

function dError(text, error) {
  console.error(text)
  console.log(error)
  store.dispatch(errorAddingData())
  alert('There was an error while deploying contracts or reading infos. See the console log.')
}

export default function confirmMark(examUnicode, classUnicode, mark) {
  // thinking as year = 2014-2015 we want to take only the first two int so we can send 
  // them to the solidity contract and risparmiare
  let web3 = store.getState()
    .web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.

      const student = contract(StudentContract)
      student.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        try {
          var studentInstance = await student.deployed()
          dispatch(addingData())
          try {
            await studentInstance.confirmResult(examUnicode, classUnicode, mark, { from: coinbase })
              .then(() => dispatch(dataAdded()))
          } catch (error) {
            dError('Error while confirming mark', error)
          } finally {
            // console.log(JSON.stringify(def))
            return browserHistory.push('/profile')
          }

          // result.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
          // console.log(JSON.stringify(result))
        } catch (error) {
          dError('Error while deploying Student Contract', error)
        }
      })

      // dispatching action for make the reducer know we are making the transaction

      //taking the first 4 numbers

    }
  } else {
    console.error('Web3 is not initialized.');
  }
}