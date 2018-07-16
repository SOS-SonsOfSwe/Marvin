import TeacherContract from '../../../../build/contracts/Teacher'
import { browserHistory } from 'react-router'
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

export default function setMarkPerExams(examUnicode, classUnicode, marks) {
  // thinking as year = 2014-2015 we want to take only the first two int so we can send 
  // them to the solidity contract and risparmiare
  var ipfs = new ipfsPromise()

  let web3 = store.getState()
    .web3.web3Instance

  // Double-check web3's status.
  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const teacher = contract(TeacherContract)
      teacher.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var teacherInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        teacher.deployed()
          .then(instance => {
            // dispatching ipfs adding data
            dispatch(ipfsAddingData())
            // dispatching blockchain adding data
            dispatch(addingData())

            ipfs.pushJSON(marks)
              .then(hashIPFS => {
                // dispatching ipfs data added
                dispatch(ipfsDataAdded)

                var hash = ipfsPromise.getBytes32FromIpfsHash(hashIPFS)
                // var hash = 'ciao'
                console.log('Marks ipfsHash: ' + hashIPFS)
                teacherInstance = instance
                // dispatching action for make the reducer know we are making the transaction
                dispatch(addingData())

                teacherInstance.registerResult(examUnicode, classUnicode, hash, { from: coinbase })
                  .then(result => {
                    // result.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
                    dispatch(dataAdded())
                    return browserHistory.push('/profile/exams-list')
                  })
                  .catch(error => {
                    dispatch(errorAddingData())
                  })
              })
              .catch(err => {
                // dispatching error adding data so we know there was a ipfs error
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