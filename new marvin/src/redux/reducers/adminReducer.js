import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import addingDataReducer from './AdminReducers/addingDataReducer'
import academicYearsReducer from './AdminReducers/academicYearReducer'
import degreeCoursesReducer from './AdminReducers/degreeCoursesReducer'
import didacticActivitiesReducer from './AdminReducers/didacticActivitiesReducer'

const adminReducer = combineReducers({
  routing: routerReducer,
  addingData: addingDataReducer,
  academicYears: academicYearsReducer,
  degreeCourses: degreeCoursesReducer,
  didacticActivities: didacticActivitiesReducer
})

export default adminReducer