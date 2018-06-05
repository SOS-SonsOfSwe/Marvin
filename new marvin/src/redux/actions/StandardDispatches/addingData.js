import { adminCostants, ipfsCostants } from '../../reducers/costants'

export function addingData() {
  return {
    type: adminCostants.ADDING
  }
}

export function dataAdded() {
  console.log('dispatch: data was added')
  return {
    type: adminCostants.ADDED_NEW_DATA
  }
}

export function errorAddingData() {
  console.log('reducer: adding data failed')
  return {
    type: adminCostants.ERROR_ADDING_NEW_DATA
  }
}

export function ipfsAddingData() {
  return {
    type: ipfsCostants.IPFS_ADDING_DATA
  }
}

export function ipfsDataAdded() {
  return {
    type: ipfsCostants.IPFS_DATA_ADDED
  }
}

export function ipfsErrorAddingData() {
  console.log('reducer: ipfs adding data failed')
  return {
    type: ipfsCostants.IPFS_ERROR_ADDING_DATA
  }
}

export function ipfsNetworkError() {
  console.log('reducer: probably an infura problem')
  return {
    type: ipfsCostants.IPFS_NOT_RESPONDING
  }
}