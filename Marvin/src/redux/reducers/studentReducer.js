import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import examsReducer from './StudentReducer/examsReducer'

const studentReducer = combineReducers({
  routing: routerReducer,
  exams: examsReducer
})

export default studentReducer