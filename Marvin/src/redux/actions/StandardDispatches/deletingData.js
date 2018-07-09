import { userCostants } from '../../reducers/costants'

export function deletingData(req) {
  return {
    type: userCostants.DELETING,
    request: req
  }
}

export function dataDeleted(load, req) {
  return {
    type: userCostants.DELETED_DATA,
    payload: load,
    request: req
  }
}

export function errorDeletingData(req) {
  console.log('reducer: adding data failed')
  return {
    type: userCostants.ERROR_DELETING_DATA,
    request: req
  }
}