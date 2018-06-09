import DegreeContract from '../../../../build/contracts/DegreeData'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { DEGREE_COURSES as req } from "../../reducers/costants/adminCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
} from '../StandardDispatches/readingData'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

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

function doAwesomeStuff(dispatch, load) {
  dispatch(dataRead({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  // return browserHistory.push('/profile/degree-courses') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function readDegreeCoursesFromDatabase(year) {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const degree = contract(DegreeContract)
      degree.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var degreeInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {

        dispatch(readingData(req))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        degree.deployed()
          .then(function (instance) {
            degreeInstance = instance

            // Attempt to read degree courses per year
            year = year.slice(0, 4)
            degreeInstance.getYearDegreesData(year, { from: coinbase })
              // .then(console.log)
              .then(result => {
                console.log('DEGREE DATA READ RESULT: ')
                console.log(result)

                // checking if the blockchain is empty for this kind of data.
                // when the blockchain is empty the first numbers it retrieves are:
                // 0x00000. When it's full it's 0xsomething. So we check the first number
                // after "x" to be not equal to zero.
                // console.log(web3.toUtf8(result[0]))
                // for degreeCourse result[0] is the actual array of unicodes of the degreeCourse
                // result[1] is the list of its respectively IPFS hash
                // console.log(web3.toHex(result[0][0]))
                if(web3.toHex(result[0][0])
                  .toString()
                  .slice(2, 3) === '0') {
                  dispatch(dataEmpty(req))
                } else {
                  // console.log('result[0] : ' + web3.toHex(result[0]))

                  let i = 0
                  var payload
                  // console.error(web3HexToInt(web3.toHex(result[0])))
                  for(let hash of result[1]) {
                    console.log('ipfsPromise: ' + ipfsPromise.getIpfsHashFromBytes32(hash))
                  }

                  for(let degree of result[0]) {
                    // var yy = web3HexToInt(web3.toHex(years))

                    // web3 offers a 8 bit return hexadecimal number. It's not needed since
                    // solidity is returning me bytes4, so 4 bytes of octa data => 3 hexa bit.
                    // I just need to slice it down to the first 3 digits and everything is ok!
                    // YOU HAVE TO CHECK THE LENGTH OF THE RETURNING BYTES AND MODIFY THE SLICE ACCORDINGLY
                    // console.log(web3.toUtf8(degree))
                    var dgr = web3.toUtf8(degree)

                    if(i === 0) { // first element of array
                      //   { year: "2017-2018", name: "Informatica" },
                      payload = [{ year: year, name: dgr }, ]
                      i++
                    } else
                      payload = [...payload,
                        { year: year, name: dgr }
                      ]
                  }
                  //sorting results fom most recent one
                  payload.sort((a, b) => b.name - a.name)
                  return doAwesomeStuff(dispatch, payload) //Repeating because of the asyncronous promises of the functions
                }
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.error('Error while reading infos: ' + result)
                console.error('Wallet ' + coinbase + ' does not have an account!')
                // dispatch(eraseAdminReducerInfo())
                // dispatch(eraseIpfsReducerInfo())
                return browserHistory.push('/profile')
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}