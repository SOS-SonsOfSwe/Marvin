// import AdminContract from '../../../../build/contracts/Admin'
import "regenerator-runtime/runtime"; // needed for async calls
import Units from 'ethereumjs-units'
import ethPrice from 'eth-price'
import { browserHistory } from 'react-router'
import store from '../../store'
import { COSTS as req } from '../reducers/costants/costCostants'

// this are standard dispatches: feel free to use them. The meaning is obvious, those are not taking any parameter.
import {
  readingData,
  dataRead,
  errorReadingData,
} from './StandardDispatches/readingData'
// var app = express();

function doAwesomeStuff(load) {
  console.log(load)
  // dispatching the action and the load
  store.dispatch(dataRead({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  } // no need for redirect anymore
  // return browserHistory.push('/profile/academic-years') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export default function getAverageGasPrice() {
  let web3 = store.getState()
    .web3.web3Instance
  if(typeof web3 !== 'undefined') {

    return async function (dispatch) {

      let url = 'https://www.etherchain.org/api/gasPriceOracle';
      store.dispatch(readingData(req))
      try {
        var res = await fetch(url)
        var out = res.json()
        return doAwesomeStuff([out]);
      } catch(error) {
        console.error(error)
        dispatch(errorReadingData(req))
      }
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function getEurFromEth(ether) {
  let web3 = store.getState()
    .web3.web3Instance
  if(typeof web3 !== 'undefined') {

    return async function (dispatch) {
      store.dispatch(readingData(req))
      try {
        var ethInEur = await ethPrice('EUR')
        ethInEur = parseFloat(ethInEur[0].slice(5))
        return doAwesomeStuff(ethInEur * ether)
      } catch(error) {
        console.error(error)
        dispatch(errorReadingData(req))
      }
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}