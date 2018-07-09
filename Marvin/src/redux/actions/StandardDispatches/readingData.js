import { userCostants, ipfsCostants } from '../../reducers/costants'

export function readingData(req) {
  return {
    type: userCostants.FETCHING_DATA,
    request: req
  }
}

export function dataRead(load, req) {
  return {
    type: userCostants.FETCH_DATA_SUCCESS,
    payload: load,
    request: req
  }
}

export function errorReadingData(req) {
  console.log('reducer: adding data failed')
  return {
    type: userCostants.FETCH_DATA_ERROR,
    request: req
  }
}

export function dataEmpty(req) {
  console.log("Blockchain vuota, e' ora di riempirla!")
  return {
    type: userCostants.FETCH_DATA_EMPTY,
    request: req
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