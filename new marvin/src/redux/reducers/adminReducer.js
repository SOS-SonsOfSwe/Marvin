import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import addingDataReducer from './AdminReducers/addingDataReducer'
import academicYearsReducer from './AdminReducers/academicYearReducer'
import degreeCoursesReducer from './AdminReducers/degreeCoursesReducer'
import coursesReducer from './AdminReducers/coursesReducer'
import readAdminsReducer from './AdminReducers/readAdminsReducer'
import readTeachersReducer from './AdminReducers/readTeachersReducer'
import readStudentsReducer from './AdminReducers/readStudentsReducer'

const adminReducer = combineReducers({
  routing: routerReducer,
  addingData: addingDataReducer,
  academicYears: academicYearsReducer,
  degreeCourses: degreeCoursesReducer,
  courses: coursesReducer,
  readAdmins: readAdminsReducer,
  readStudents: readStudentsReducer,
  readTeachers: readTeachersReducer
})

export default adminReducer