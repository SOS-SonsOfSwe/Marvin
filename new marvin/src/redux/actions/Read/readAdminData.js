// functions used to read all the infos from database

import * as adminData from '../../../utils/adminData'
import * as costants from '../../reducers/costants/adminCostants'

// prototype for the dispatch action. Here we want to send to the store the payload we succeeded in retrieving
function fetchData(load) {
  return {
    type: costants.FETCH_DATA,
    payload: load // so we will tell the reducer to wait for the end of fetching
  }
}

// this function is useful to tell the reducer we terminated to fetch data from database so he can unlock the component and render all the informations
function fetchDataSuccess() {
  return {
    type: costants.FETCH_DATA_SUCCESS,
  }
}

// this function is useful to tell the reducer there was an error while trying to retrieve data from database
function fetchDataError() {
  return {
    type: costants.FETCH_DATA_ERROR,
  }
}

export function readAcademicYearsFromDatabase() {
  // we are trying to put the infos we collected into the store. To achieve this we have to dispatch (=put into store) an action (not a object)
  // doing so we guarantee that the infos in the store will be updated with what we found here
  // So, as we are returning something to the caller (see the containers) we have to use the dispatch (passed as parameter from the function) 
  // and to fill it with the infos we found.
  return function (dispatch) {
    dispatch(fetchData({
      // ugly but working way to say: "we found data, we want to associate it to the load, so we create an object to pass to the dispatch thanks to the fetchData function
      'load': adminData.academicYears
    }))
    setTimeout(() => dispatch(fetchDataSuccess()), 5000)
  }
}

export function readDegreeCoursesFromDatabase() {
  return function (dispatch) {
    dispatch(fetchData({
      'load': adminData.degreeCourses
    }))
  }
}

export function readDidacticActivitiesFromDatabase() {
  return function (dispatch) {
    dispatch(fetchData({
      'load': adminData.didacticActivities
    }))
  }
}