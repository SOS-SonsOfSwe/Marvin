import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import classesReducer from './TeacherReducer/classesReducer'
import examsReducer from './TeacherReducer/examsReducer'
import studentsReducer from './TeacherReducer/studentsReducer'

const teacherReducer = combineReducers({
  routing: routerReducer,
  classes: classesReducer,
  exams: examsReducer,
  students: studentsReducer
})

export default teacherReducer