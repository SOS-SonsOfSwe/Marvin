import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import addingDataReducer from './AdminReducers/addingDataReducer'
import academicYearsReducer from './AdminReducers/academicYearReducer'
import degreeCoursesReducer from './AdminReducers/degreeCoursesReducer'
import coursesReducer from './AdminReducers/coursesReducer'

const adminReducer = combineReducers({
  routing: routerReducer,
  addingData: addingDataReducer,
  academicYears: academicYearsReducer,
  degreeCourses: degreeCoursesReducer,
  courses: coursesReducer
})

export default adminReducer