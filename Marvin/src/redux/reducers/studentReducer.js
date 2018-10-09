import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import examsReducer from './StudentReducer/examsReducer'
import subscribedMarkedReducer from './StudentReducer/subscribedMarkedReducer'
import bookletReducer from './StudentReducer/bookletReducer'

const studentReducer = combineReducers({
  routing: routerReducer,
  exams: examsReducer,
  subscribedExams: subscribedMarkedReducer,
  bookletExams: bookletReducer
})

export default studentReducer