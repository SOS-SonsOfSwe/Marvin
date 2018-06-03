import AdminContract from '../../../../build/contracts/Admin'
import {
  browserHistory
} from 'react-router'
import store from '../../../store'
// import * as utils from '../../../utils/validations'

import {
  userCostants
} from '../../reducers/costants'

const contract = require('truffle-contract')

// export const USER_INSERTED = 'USER_INSERTED'
//function userLoggedIn(user) 
function userInserted(YesOrNo) {
  return {
    type: userCostants.USER_INSERTED,
    //payload: user
    payload: YesOrNo
  }
}

export function insertUser(FCInserted, UCInserted, tpInserted) {
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
            adminIstance.addUser(FCInserted, UCInserted, tpInserted, {
                from: coinbase
              })
              .then(result => {
                // yon.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
                var yon = result.receipt.status;

                console.log(yon);

                dispatch(userInserted({
                  "YesOrNo": yon
                }))

                return browserHistory.push('/') //| alert(UCInserted + " inserted as " + utils.userDef(parseInt(tpInserted, 10)))
              })

              .catch(function (result) {

              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}