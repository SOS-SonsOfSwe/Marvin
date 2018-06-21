import { adminCostants } from '../../reducers/costants'

export function deletingData(req) {
  return {
    type: adminCostants.DELETING,
    request: req
  }
}

export function dataDeleted(load, req) {
  return {
    type: adminCostants.DELETED_DATA,
    payload: load,
    request: req
  }
}

export function errorDeletingData(req) {
  console.log('reducer: adding data failed')
  return {
    type: adminCostants.ERROR_DELETING_DATA,
    request: req
  }
}