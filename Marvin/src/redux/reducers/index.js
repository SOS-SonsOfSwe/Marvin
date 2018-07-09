import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import ipfsReducer from './ipfsReducer'
// import studentReducer from './studentReducer'
import teacherReducer from './teacherReducer'
import web3Reducer from './web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  admin: adminReducer,
  teacher: teacherReducer,
  // student: studentReducer,
  web3: web3Reducer,
  ipfs: ipfsReducer
})

export default reducer