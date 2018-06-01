// import store from '../../../store'
import * as adminData from '../../../utils/adminData'
import { READ_ACADEMIC_YEAR_DATA } from '../../reducers/costants/adminCostants'

function readData(load) {
  return {
    type: READ_ACADEMIC_YEAR_DATA,
    payload: load
  }
}

export function readAcademicYearDataFromDatabase() {
  return function (dispatch) {
    dispatch(readData({
      'load': adminData.academicYears
    }))
  }
}