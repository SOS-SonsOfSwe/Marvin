import AdminContract from '../../../../build/contracts/Admin'
import Units from 'ethereumjs-units'
import ethPrice from 'eth-price'
import store from '../../../store'

const contract = require('truffle-contract')

export default function addAcademicYearcost(year) {
  // thinking as year = 2014-2015 we want to take only the first two int so we can send 
  // them to the solidity contract and risparmiare

  let web3 = store.getState()
    .web3.web3Instance

  // Double-check web3's status.
  if(typeof web3 !== 'undefined') {

    const admin = contract(AdminContract)

    admin.setProvider(web3.currentProvider)

    var gasPrice

    // admin.web3.eth.getGasPrice((error, result) => {
    //   gasPrice = Number(result)
    //   // other methods here, as it's a callback which is returning a value
    // })
    // console.log('GasPrice: ' + gasPrice)
    gasPrice = 1000000000

    // Declaring this for later so we can chain functions on Authentication.
    var adminInstance

    // Get current ethereum wallet.
    web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
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

          year = '2000'

          adminInstance.AddNewYear.estimateGas(year)
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