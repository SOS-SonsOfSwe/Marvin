import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import classesReducer from './TeacherReducer/classesReducer'
import examsReducer from './TeacherReducer/examsReducer'

const teacherReducer = combineReducers({
  routing: routerReducer,
  classes: classesReducer,
  exams: examsReducer
})

export default teacherReducer