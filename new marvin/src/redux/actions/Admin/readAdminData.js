// functions used to read all the infos from database

import * as adminData from '../../../utils/adminData'
// import { adminCostants } from '../../reducers/costants'
import { DIDACTIC_ACTIVITIES } from '../../reducers/costants/adminCostants'
import { dataRead, readingData } from '../../actions/StandardDispatches/readingData'

// prototype for the dispatch action. Here we want to send to the store the payload we succeeded in retrieving
// function fetchingData() {
//   return {
//     type: adminCostants.FETCHING_DATA
//     // payload: load // so we will tell the reducer to wait for the end of fetching
//   }
// }

// // this function is useful to tell the reducer we terminated to fetch data from database so he can unlock the component and render all the informations
// function fetchDataSuccess(data) {
//   return {
//     type: adminCostants.FETCH_DATA_SUCCESS,
//     payload: data
//   }
// }

// this function is useful to tell the reducer there was an error while trying to retrieve data from database
// function fetchDataError() {
//   return {
//     type: costants.FETCH_DATA_ERROR,
//   }
// }

// export function readAcademicYearsFromDatabase() {
//   // we are trying to put the infos we collected into the store. To achieve this we have to dispatch (=put into store) an action (not a object)
//   // doing so we guarantee that the infos in the store will be updated with what we found here
//   // So, as we are returning something to the caller (see the containers) we have to use the dispatch (passed as parameter from the function) 
//   // and to fill it with the infos we found.
//   return function (dispatch) {
//     dispatch(fetchingData())
//     setTimeout(() => dispatch(fetchDataSuccess({
//       // ugly but working way to say: "we found data, we want to associate it to the load, so we create an object to pass to the dispatch thanks to the fetchingData function
//       'load': adminData.academicYears
//     })), 2000)
//   }
// }

// const fetchRequest = createAction('FETCH_REQUEST')
// const fetchSuccess = createAction('FETCH_SUCCESS')
// const fetchFailure = createAction('FETCH_FAILURE)
// const fetch = (url) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(fetchRequest())
//             const response= await _fetch(url)
//             if(result.statusCode !== 200)
//                 throw new Error()
//             const result = await response.json()
//             dispatch(fetchSuccess(result))
//         }
//         catch(error) {
//             dispatch(fetchFailure(error))
//         }
//     }
// }

// export function readDegreeCoursesFromDatabase(years) {
//   return function (dispatch) {
//     dispatch(fetchingData())
//     setTimeout(() => dispatch(fetchDataSuccess({
//       'load': adminData.degreeCourses.filter(function (obj) { return obj.year === years })
//     })), 2000)
//   }
// }

export function readDidacticActivitiesFromDatabase(years, degreeC) {
  return function (dispatch) {
    dispatch(readingData(DIDACTIC_ACTIVITIES))
    setTimeout(() => dispatch(dataRead({
      'load': adminData.didacticActivities.filter((obj) => obj.year === years && obj.course === degreeC)
    }, DIDACTIC_ACTIVITIES)), 2000)
  }
}
// export function readDidacticActivitiesFromDatabase(years, degreeC) {
//   return function (dispatch) {
//     dispatch(readingData(DIDACTIC_ACTIVITIES))
//     setTimeout(() => dispatch(dataRead({
//       'load': adminData.didacticActivities
//     }, DIDACTIC_ACTIVITIES)), 2000)
//   }
// }