import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
// import studentReducer from './studentReducer'
// import profReducer from './profReducer'
import web3Reducer from './web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  admin: adminReducer,
  // prof: profReducer,
  // student: studentReducer,
  web3: web3Reducer
})

export default reducer