//import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import UniversityContract from '../../../../build/contracts/UserLogic.json'
import { browserHistory } from 'react-router'
import store from '../../../store'
import * as utils from '../../../util/util'


const contract = require('truffle-contract')

export const USER_INSERTED = 'USER_INSERTED'
//function userLoggedIn(user) 
function userInserted(YesOrNo) {
  return {
    type: USER_INSERTED,
    //payload: user
    payload: YesOrNo
  }
}

export function insertUser(UCInserted, FCInserted, tpInserted) { 
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      // const authentication = contract(AuthenticationContract)
      // authentication.setProvider(web3.currentProvider)

      const university = contract(UniversityContract)
      university.setProvider(web3.currentProvider)
      
      // Declaring this for later so we can chain functions on Authentication.
      //var authenticationInstance
      var universityIstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        
        university.deployed().then(istance => {
          universityIstance = istance
          universityIstance.addUser(UCInserted, FCInserted, tpInserted, {from: coinbase}) 
          .then(result => {
           
            var yon = result.receipt.status;
            
            console.log(yon);
            
            //var text;

            // if(yon == 0) {
            //   text = "L'utente inserito e' gia' presente nel sistema" 
            // }
            // else
            //   text = FCInserted + " inserted as " + tpInserted
                        
            dispatch(userInserted({
              "YesOrNo": yon
            }))
            
            return browserHistory.push('/') | alert(UCInserted + " inserted as " + utils.userDef(parseInt(tpInserted,10))) 
                                        //alert(yon.receipt.status)
          })

          .catch(function(result) {
            // yon.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
            //console.log(result)
            //return browserHistory.push('/dashboard') | alert("L'azione non e' andata a buon fine: unicode gia' registrato")
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
