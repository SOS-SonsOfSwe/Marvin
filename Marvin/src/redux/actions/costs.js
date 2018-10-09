// import AdminContract from '../../../../build/contracts/Admin'
// import Units from 'ethereumjs-units'

import { browserHistory } from 'react-router'
import store from '../../store'
import { COSTS as req } from '../reducers/costants/costCostants'

// this are standard dispatches: feel free to use them. The meaning is obvious, those are not taking any parameter.
import {
  readingData,
  dataRead,
} from './StandardDispatches/readingData'
// var app = express();

function doAwesomeStuff(load) {
  // console.log(load)
  // dispatching the action and the load
  store.dispatch(dataRead({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if ('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  } // no need for redirect anymore
  // return browserHistory.push('/profile/academic-years') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export default function getAverageGasPrice() {
  let web3 = store.getState()
    .web3.web3Instance
  if (typeof web3 !== 'undefined') {

    return function (dispatch) {
      //   app.use(function (req, res, next) {

      //     // Website you wish to allow to connect
      //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

      //     // Request methods you wish to allow
      //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      //     // Request headers you wish to allow
      //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      //     // Set to true if you need the website to include cookies in the requests sent
      //     // to the API (e.g. in case you use sessions)
      //     res.setHeader('Access-Control-Allow-Credentials', true);

      //     // Pass to next layer of middleware
      //     next();
      //   });
      let url = 'https://www.etherchain.org/api/gasPriceOracle';
      store.dispatch(readingData(req))
      fetch(url)
        .then(res => {
          // console.log(res)
          return res.json();
        })
        .then((out) => {
          // console.log('Checkout this JSON! ', out);
          let payload;
          for (let i = 0; i < 17; ++i) {
            if (i === 0) payload = out;
            else payload = [...payload, out]
          }

          return doAwesomeStuff(payload)
        })
        .catch(err => { throw err });
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

// thinking as year = 2014-2015 we want to take only the first two int so we can send 
// them to the solidity contract and risparmiare

//   let web3 = store.getState()
//     .web3.web3Instance

//   // Double-check web3's status.
//   if(typeof web3 !== 'undefined') {

//     return function (dispatch) {
//       // Using truffle-contract we create the authentication object.

//       //   const admin = contract(AdminContract)

//       //   admin.setProvider(web3.currentProvider)

//       var gasPrice

//       web3.eth.getGasPrice((error, result) => {
//         gasPrice = Number(result)
//         // other methods here, as it's a callback which is returning a value
//       })
//       // // console.log('GasPrice: ' + gasPrice)
//       //   gasPrice = 1000000000

//       // Declaring this for later so we can chain functions on Authentication.
//       //   var adminIstance

//       // Get current ethereum wallet.
//       web3.eth.getCoinbase((error, coinbase) => {
//         // Log errors, if any.
//         if(error) {
//           console.error(error);
//         }

// admin.deployed()
//   .then(instance => {
//     adminIstance = instance

//     var estimatedGas
//     var costOperationWei
//     var costOperationEth
//     var costOperationEur

//     adminIstance.addNewYear.estimateGas(year)
//       .then(result => {
//         estimatedGas = result
//         // console.log('GasPrice before op: ' + gasPrice)
//         costOperationWei = estimatedGas * gasPrice
//         costOperationEth = Units.convert(costOperationWei, 'wei', 'eth')
//         // console.log('estimateGas: ' + estimatedGas)
//         // console.log('Cost of the operation in Wei: ' + costOperationWei)
//         // console.log('Cost of the operation in Ether: ' + costOperationEth)
//         ethPrice('EUR')
//           .then(ethInEur => {
//             ethInEur = parseFloat(ethInEur[0]
//               .slice(5))
//             costOperationEur = ethInEur * costOperationEth
//             console.error('Cost of the operation in EUR: ' + costOperationEur)
//           })

//       })

//     // dispatching action for make the reducer know we are making the transaction
//     dispatch(addingData())
//     //taking the first 4 numbers
//     year = year.slice(0, 4)
//     //be careful!! This number cannot be over 4095 or it starts again from 1.

//     adminIstance.addNewYear(year, { from: coinbase })
//       .then(result => {
//         // result.receipt.status ritorna lo stato dell'operazione: 0x01 se successo, 0x00 se fallito
//         // // console.log(JSON.stringify(result))
//         dispatch(dataAdded())
//         // alert('The new academic year has been added! Wait some seconds to make it write on blockchain.')
//       })
//       .catch(error => {
//         dispatch(errorAddingData())
//       })
//       .finally(def => {
//         // // console.log(JSON.stringify(def))
//         return browserHistory.push('/profile/academic-years')
//       })
//   })
//       })
//     }
//   } else {
//     console.error('Web3 is not initialized.');
//   }