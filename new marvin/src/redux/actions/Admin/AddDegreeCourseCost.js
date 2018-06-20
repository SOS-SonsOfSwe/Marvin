import AdminContract from '../../../../build/contracts/Admin'
import Units from 'ethereumjs-units'
import ethPrice from 'eth-price'
import store from '../../../store'

// import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

export default function addDegreeCourseCost(degreeUnicode, year) {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    const admin = contract(AdminContract)

    admin.setProvider(web3.currentProvider)

    var gasPrice

    gasPrice = 1000000000

    var adminInstance

    web3.eth.getCoinbase((error, coinbase) => {
      if(error) {
        console.error(error);
      }

      admin.deployed()
        .then(instance => {
          adminInstance = instance

          var estimatedGas
          var costOperationWei
          var costOperationEth
          var costOperationUsd
          degreeUnicode = 'INF17'
          year = '2000'
          var degreeData = 'asdasdasdasdasdasd'

          adminInstance.addNewCourse.estimatedGas(degreeUnicode, year, degreeData)
            .then(result => {
              estimatedGas = result
              costOperationWei = estimatedGas * gasPrice
              costOperationEth = Units.convert(costOperationWei, 'wei', 'eth')
              // console.log('estimateGas: ' + estimatedGas)
              // console.log('Cost of the operation in Wei: ' + costOperationWei)
              // console.log('Cost of the operation in Ether: ' + costOperationEth)
              ethPrice('USD')
                .then(ethInUsd => {
                  ethInUsd = parseFloat(ethInUsd[0].slice(5))
                  costOperationUsd = ethInUsd * costOperationEth
                  console.error('Cost of the operation in USD: ' + costOperationUsd)
                  return costOperationUsd
                })

            })
        })
    })
  } else {
    console.error('Web3 is not initialized.');
  }
}