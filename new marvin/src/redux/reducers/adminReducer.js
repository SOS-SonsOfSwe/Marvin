import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import addingDataReducer from './AdminReducers/addingDataReducer'
import academicYearsReducer from './AdminReducers/academicYearReducer'
import degreesReducer from './AdminReducers/degreesReducer'
import classesReducer from './AdminReducers/classesReducer'
import examsReducer from './AdminReducers/examsReducer'
import readAdminsReducer from './AdminReducers/readAdminsReducer'
import readTeachersReducer from './AdminReducers/readTeachersReducer'
import readStudentsReducer from './AdminReducers/readStudentsReducer'

const adminReducer = combineReducers({
  routing: routerReducer,
  addingData: addingDataReducer,
  academicYears: academicYearsReducer,
  degrees: degreesReducer,
  classes: classesReducer,
  exams: examsReducer,
  readAdmins: readAdminsReducer,
  readStudents: readStudentsReducer,
  readTeachers: readTeachersReducer
})

export default adminReducer