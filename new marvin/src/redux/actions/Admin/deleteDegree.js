import AdminContract from '../../../../build/contracts/Admin'
import DegreeContract from '../../../../build/contracts/DegreeData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { DEGREES as req } from '../../reducers/costants/adminCostants'
// import { web3HexToInt } from '../../../utils/validations'

// those are standard dispatches. These are taking the "req" parameter which is responsible for addressing the right action to the right part of the reducer.
// deletingData is taking one parameter, req,
// dataDeleted is taking two parameters, see the example below
// errorDeletingData is taking one parameter, req
import {
  deletingData,
  dataDeleted,
  errorDeletingData,
  // ipfsReadingData,
  // ipfsDataRead,
  // ipfsErrorReadingData,
  // ipfsNetworkError,
} from '../StandardDispatches/deletingData'

// import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load) {
  // dispatching the action and the load
  dispatch(dataDeleted({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if ('redirect' in currentLocation.query) {
    return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    // return browserHistory.replace('/profile')
  } // no need for redirect anymore
  //   return browserHistory.push('/profile/academic-years') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function deleteDegreeFromDatabase(degreeUnicode, year) {
  let web3 = store.getState()
    .web3.web3Instance

  if (typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const admin = contract(AdminContract)
      admin.setProvider(web3.currentProvider)

      const degree = contract(DegreeContract)
      degree.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var adminInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // here i'm starting to read
        dispatch(deletingData(req))

        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        var yearToRefer = year.slice(0, 4)
        // var index

        // degree.deployed()
        //   .then(degreeInstance => {
        //     degreeInstance.getYearDegreeIndex(degreeUnicode, yearToRefer, { from: coinbase })
        //       .then(result => console.log(result))
        // })
        admin.deployed()
          .then(function (instance) {
            adminInstance = instance
            // var yearToRefer = year.slice(0, 4)
            console.log('degreeUnicode: ' + degreeUnicode, 'yearToRefer: ' + yearToRefer)
            adminInstance.removeDegree(degreeUnicode, yearToRefer, { from: coinbase })
              .then(() => {
                return doAwesomeStuff(dispatch, degreeUnicode) //Repeating because of the asyncronous promises of the functions
              })
              .catch(error => {
                dispatch(errorDeletingData())
                // If error, go to signup page.
                console.error('Error while deleting infos: ' + error)
              })
              .finally(() => { return browserHistory.push('/profile/degrees') })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}