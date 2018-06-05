import { adminCostants, ipfsCostants } from '../../reducers/costants'

export function readingData() {
  return {
    type: adminCostants.FETCHING_DATA
  }
}

export function dataRead(payload) {
  return {
    type: adminCostants.FETCH_DATA_SUCCESS,
    payload: payload
  }
}

export function errorReadingData() {
  console.log('reducer: adding data failed')
  return {
    type: adminCostants.FETCH_DATA_ERROR
  }
}

export function ipfsReadingData() {
  return {
    type: ipfsCostants.IPFS_READING_DATA
  }
}

export function ipfsDataRead() {
  return {
    type: ipfsCostants.IPFS_DATA_READ
  }
}

export function ipfsErrorReadingData() {
  console.log('reducer: ipfs adding data failed')
  return {
    type: ipfsCostants.IPFS_ERROR_READING_DATA
  }
}

export function ipfsNetworkError() {
  console.log('reducer: probably an infura problem')
  return {
    type: ipfsCostants.IPFS_NOT_RESPONDING
  }
}

export function eraseAdminReducerInfo() {
  console.log('Sembra essere andato tutto male, eh?')
  return {
    type: adminCostants.ERASE_ADMIN_REDUCER
  }
}

export function eraseIpfsReducerInfo() {
  return {
    type: ipfsCostants.ERASE_IPFS_REDUCER
  }
}