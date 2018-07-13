import TeacherContract from '../../../../build/contracts/Teacher'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { STUDENTS as req } from '../../reducers/costants/teacherCostants'
// import { web3HexToInt } from '../../../utils/validations'

// those are standard dispatches. These are taking the "req" parameter which is responsible for addressing the right action to the right part of the reducer.
// readingData is taking one parameter, req,
// dataRead is taking two parameters, see the example below
// dataEmpty is taking one parameter, req
import {
  readingData,
  dataRead,
  dataEmpty,
  // ipfsReadingData,
  // ipfsDataRead,
  // ipfsErrorReadingData,
  // ipfsNetworkError,
} from '../StandardDispatches/readingData'

// import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load) {
  // dispatching the action and the load
  dispatch(dataRead({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if ('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  } // no need for redirect anymore
  // return browserHistory.push('/profile/academic-years') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function readStudentsPerExam(examUnicode) {
  let web3 = store.getState()
    .web3.web3Instance

  if (typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const teacher = contract(TeacherContract)
      teacher.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // here i'm starting to read
        dispatch(readingData(req))

        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        teacher.deployed()
          .then(function (teacherInstance) {

            teacherInstance.examSubscribedStudent(examUnicode, { from: coinbase })
              .then(result => {
                // checking if the blockchain is empty for this kind of data.
                // when the blockchain is empty the first numbers it retrieves are:
                // 0x00000. When it's full it's 0xsomething. So we check the first number
                // after "x" to be not equal to zero.
                if (result.length === 0) {
                  dispatch(dataEmpty(req))
                } else {
                  // console.log('result[0] : ' + web3.toHex(result[0]))

                  var payload
                  // console.error(web3HexToInt(web3.toHex(result[0])))

                  for (let badgeNumber of result) {
                    // var yy = web3HexToInt(web3.toHex(years))

                    // web3 offers a 8 bit return hexadecimal number. It's not needed since
                    // solidity is returning me bytes4, so 4 bytes of octa data => 3 hexa bit.
                    // I just need to slice it down to the first 3 digits and everything is ok!
                    // YOU HAVE TO CHECK THE LENGTH OF THE RETURNING BYTES AND MODIFY THE SLICE ACCORDINGLY
                    // if(web3.toHex(year)
                    //   .toString()
                    //   .slice(0, 5) !== '0x000') {
                    // these lines was able to detect a non-resize of the array of solidity. No more need for them.

                    if (payload == null) { // first element of array
                      payload = [{ badgeNumber: web3.toDecimal(badgeNumber) }]
                    } else
                      payload = [...payload,
                      { badgeNumber: web3.toDecimal(badgeNumber) }
                      ]
                    // }
                  }
                  //sorting results fom most recent one
                  payload.sort((a, b) => (b.badgeNumber - a.badgeNumber))
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