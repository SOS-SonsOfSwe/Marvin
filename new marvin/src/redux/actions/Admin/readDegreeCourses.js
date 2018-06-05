import DegreeContract from '../../../../build/contracts/DegreeData'
import { browserHistory } from 'react-router'
import store from '../../../store'

import {
  readingData,
  // errorReadingData,
  dataRead,
  // ipfsReadingData,
  // ipfsDataRead,
  // ipfsErrorReadingData,
  // ipfsNetworkError,
  eraseAdminReducerInfo,
  eraseIpfsReducerInfo
} from '../StandardDispatches/readingData'

// import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load) {
  dispatch(dataRead(load))
  // var currentLocation = browserHistory.getCurrentLocation()
  // if('redirect' in currentLocation.query) {
  //   //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
  //   return browserHistory.replace('/profile')
  // }
  // return browserHistory.push('/profile') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function readDegreeCoursesFromDatabase(years) {
  let web3 = store.getState()
    .web3.web3Instance

  // export var degreeCourses = [
  //   { year: "2017-2018", name: "Informatica" },
  //   { year: "2017-2018", name: "Matematica" },
  //   { year: "2017-2018", name: "Psicologia" },
  //   { year: "2017-2018", name: "Ingegneria dell'energia" },
  //   { year: "2017-2018", name: "Giurisprudenza" },
  //   { year: "2016-2017", name: "Informatica" },
  //   { year: "2016-2017", name: "Matematica" },
  //   { year: "2016-2017", name: "Psicologia" }
  // ]

  var payload = {
    prova: ''
  }

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const degree = contract(DegreeContract)
      degree.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var degreeInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        degree.deployed()
          .then(function (instance) {
            degreeInstance = instance

            dispatch(readingData())
            // Attempt to read degree courses per year
            degreeInstance.getYearDegreesData('a', { from: coinbase })
              .then(result => {
                console.log('result[0]: ' + web3.toUtf8(result))
                payload.prova = web3.toUtf8(result[0]);

                // console.log("result[3]:", ipfsPromise.getIpfsHashFromBytes32(result[3]))
                // if(payload === "caucasico") {
                //   var ipfs = new ipfsPromise()
                //   console.log('Waiting for the data from IPFS...')
                //   ipfs.getJSON(ipfsPromise.getIpfsHashFromBytes32(result[3]))
                //     .then(jFile => {
                //       //dispatch(userLoggingIn()) //dispatch waiting for data
                //       console.log("jFile:", jFile)
                //       payload.name = jFile.name;
                //       payload.surname = jFile.surname;
                //       payload.email = jFile.email;
                //       return doAwesomeStuff(dispatch, payload)
                //     })
                //     .catch(err => {
                //       // HERE I CATCH THE ERROR OF THE getJSON METHOD. JUST FOR TESTING
                //       // console.log('Fail:', err)

                //       // dispatch(userLoggingIn())

                //     })
                //   // dispatch(userLoggingIn())
                // } else
                return doAwesomeStuff(dispatch, payload) //Repeating because of the asyncronous promises of the functions
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.log('Error while reading infos: ' + error)
                console.error('Wallet ' + coinbase + ' does not have an account!')
                dispatch(eraseAdminReducerInfo())
                dispatch(eraseIpfsReducerInfo())
                return browserHistory.push('/profile')
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}