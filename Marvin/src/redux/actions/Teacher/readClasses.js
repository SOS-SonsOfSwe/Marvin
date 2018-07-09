import "regenerator-runtime/runtime"; // needed for async calls
import TeacherContract from '../../../../build/contracts/Teacher'
import { browserHistory } from 'react-router'
import store from '../../../store'
import { CLASSES as req } from "../../reducers/costants/teacherCostants";

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  dataRead,
  dataEmpty,
} from '../StandardDispatches/readingData'

// import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load) {
  dispatch(dataRead({ load }, req))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  // return browserHistory.push('/profile/degrees') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

// async function processIPFSResultParallel(ipfs, payload) {
//   const promises = payload.map(item => ipfs.getJSON(item.classData)
//     .then(result => {
//       // here I overwrite the description information with the JSON returning from the ipfs
//       item.classData = result.classData
//     }))
//   await Promise.all(promises)
// }

export function readClassesFromDatabase() {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const teacher = contract(TeacherContract)
      teacher.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var teacherInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {

        dispatch(readingData(req))

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        teacher.deployed()
          .then(function (instance) {
            teacherInstance = instance

            // Attempt to read degrees per year
            teacherInstance.myClasses({ from: coinbase })
              .then(result => {
                console.log('CLASSES READ RESULT: ')
                console.log(result)

                // checking if the blockchain is empty for this kind of data.
                // when the blockchain is empty the first numbers it retrieves are:
                // 0x00000. When it's full it's 0xsomething. So we check the first number
                // after "x" to be not equal to zero.
                // console.log(web3.toUtf8(result[0]))
                // for teacher result[0] is the actual array of unicodes of the teacher
                // result[1] is the list of its respectively IPFS hash
                // console.log('web3ToHex: ' + web3.toHex(result[0][0]))

                // console.error(web3.toUtf8(result[0]))

                if(result.length === 0) {
                  dispatch(dataEmpty(req))
                } else {
                  //   // console.log('result[0] : ' + web3.toHex(result[0]))

                  var payload
                  let i = 0;

                  // export var classes = [{
                  //   year: "2017-2018",
                  //   degreeUnicode: "MAT/INF17",
                  //   classData: {
                  //     'description': "Reti e sicurezza"
                  //   },
                  //   classUnicode: 'RETISICU17'
                  // }]

                  // Just read all the information inside the blockchain.
                  // It is better to read all the infos together without doing
                  // much conversions because we can close the communication
                  // with the blockchain faster
                  var classUnicode
                  for(let cU of result) {
                    classUnicode = web3.toUtf8(cU);
                    if(i === 0) { // first element of array
                      payload = [{ classUnicode: classUnicode }, ]
                    } else
                      payload = [...payload,
                        { classUnicode: classUnicode }
                      ]
                    i++
                  }

                  // for(i; i < result.length; i++) {
                  //   // var teacher = result[2][i]
                  //   // var hash = result[0][i]
                  //   // var teac = web3.toDecimal(result[1][i])

                  //   classUnicode = web3.toUtf8(result)
                  //   // var hashIPFS = ipfsPromise.getIpfsHashFromBytes32(hash)
                  //   // i'm storing the informations inside the description. We will retrieve them later.
                  //   //   if(i === 0) { // first element of array
                  //   //     payload = [{ degreeUnicode: degreeUnicode, teacher: teac, classData: hashIPFS, classUnicode: coUni }, ]
                  //   //   } else
                  //   //     payload = [...payload,
                  //   //       { degreeUnicode: degreeUnicode, teacher: teac, classData: hashIPFS, classUnicode: coUni }
                  //   //     ]
                  //   // }
                  //   if(i === 0) { // first element of array
                  //     payload = [{ classUnicode: classUnicode }, ]
                  //   } else
                  //     payload = [...payload,
                  //       { classUnicode: classUnicode }
                  //     ]
                  // }
                  // this function provides a parallel loading of all the informations from ipfs. 
                  // It renders the data all together: an interesting improvement will be to load the data
                  // per parts so in case of some ipfs file failure the app is still working
                  // var ipfs = new ipfsPromise()
                  // processIPFSResultParallel(ipfs, payload)
                  // .then(result => {
                  // payload.sort((a, b) => b.classUnicode - a.classUnicode)
                  return doAwesomeStuff(dispatch, payload)
                  // })

                }
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.error('Error while reading infos: ' + result)
                console.error('Wallet ' + coinbase + 'encountered an error!')
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