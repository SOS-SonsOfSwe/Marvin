//guardato
import store from '../../src/store'
import Web3 from 'web3'

import { logoutUser } from "../../src/redux/actions/Login-logout-signup/LogoutButtonActions"

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'

function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function (dispatch) {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if(typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3Instance: web3
      }

      console.log('Injected web3 detected.');

      resolve(store.dispatch(web3Initialized(results)))

      var account = web3.eth.accounts[0];
      setInterval(function () {
        if(web3.eth.accounts[0] !== account) {
          account = web3.eth.accounts[0];
          resolve(store.dispatch(logoutUser()));
        }
      }, 100);
      // resolve(eraseReducers())
      // resolve(store.dispatch(userLoggedOut()))
    } else {

      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')

      web3 = new Web3(provider)

      results = {
        web3Instance: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(store.dispatch(web3Initialized(results)))
      // resolve(eraseReducers())
      // resolve(store.dispatch(userLoggedOut()))
    }
  })
})

export default getWeb3