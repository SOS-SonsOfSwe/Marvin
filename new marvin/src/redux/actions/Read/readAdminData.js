// functions used to read all the infos from database

import * as adminData from '../../../utils/adminData'
import { READ_DATA } from '../../reducers/costants/adminCostants'

// prototype for the dispatch action
function readData(load) {
  return {
    type: READ_DATA,
    payload: load
  }
}

export function readAcademicYearsFromDatabase() {
  // we are trying to put the infos we collected into the store. To achieve this we have to dispatch (=put into store) an action (not a object)
  // doing so we guarantee that the infos in the store will be updated with what we found here
  // So, as we are returning something to the caller (see the containers) we have to use the dispatch (passed as parameter from the function) 
  // and to fill it with the infos we found.
  return function (dispatch) {
    dispatch(readData({
      // ugly but working way to say: "we found data, we want to associate it to the load, so we create an object to pass to the dispatch thanks to the readData function
      'load': adminData.academicYears
    }))
  }
}

export function readDegreeCoursesFromDatabase() {
  return function (dispatch) {
    dispatch(readData({
      'load': adminData.degreeCourses
    }))
  }
}

export function readDidacticActivitiesFromDatabase() {
  return function (dispatch) {
    dispatch(readData({
      'load': adminData.didacticActivities
    }))
  }
}