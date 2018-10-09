import AdminContract from '../../../../build/contracts/Admin'
import { browserHistory } from 'react-router'
import store from '../../../store'
// import * as utils from '../../../utils/validations'

import {
  adminCostants
} from '../../reducers/costants'

import {
  addingData,
  errorAddingData,
  dataAdded,
} from '../StandardDispatches/addingData'

const contract = require('truffle-contract')

// export const USER_INSERTED = 'USER_INSERTED'
//function userLoggedIn(user) 
function userInserted(YesOrNo) {
  return {
    type: adminCostants.USER_INSERTED,
    //payload: user
    payload: YesOrNo
  }
}

export function insertUser(FCInserted, UCInserted, tpInserted, degreeUnicode) {
  // console.log('Type inserted: ' + tpInserted)
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
            dispatch(addingData())
            adminIstance = instance
            adminIstance.addUser(FCInserted, UCInserted, tpInserted, degreeUnicode, { from: coinbase })
              .then(result => {
                // yon.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
                let yon = result.receipt.status;

                // console.log(yon);

                dispatch(userInserted({
                  "YesOrNo": yon
                }))
                dispatch(dataAdded())
                // console.log("tpInserted:" + tpInserted)
                switch(parseInt(tpInserted, 10)) {
                case 1:
                  return browserHistory.push('/profile/administrators')
                case 2:
                  return browserHistory.push('/profile/teachers')
                case 3:
                  return browserHistory.push('/profile/students')
                default:
                  return browserHistory.push('/profile')
                }
              })

              .catch(function (result) {
                dispatch(errorAddingData())
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}