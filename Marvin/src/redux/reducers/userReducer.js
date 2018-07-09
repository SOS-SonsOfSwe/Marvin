import { userCostants } from './costants'
import { adminCostants } from './costants'

const initialState = {
  data: null,
  isLoading: null,
  isAdmin: null,
  isUni: null,
  isProf: null,
  isStudent: null,
  metamask: null
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    default: {
      return state
    }

  case userCostants.USER_LOGGED_IN:
    {
      // Object.assign creates a new object with the informations of the previous one. Use this for referene: 
      // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      // So it returns a new object - as redux works - with all the informations from state, with the new ones which are passed from action.payload
      console.log('Reducer: logged in')
      console.log('Reducer: userType: ' + action.payload.payload.tp)
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        isAdmin: ((action.payload.payload.tp === 4) || (action.payload.payload.tp === 1)) ? true : false,
        isUni: (action.payload.payload.tp === 4) ? true : false,
        isProf: (action.payload.payload.tp === 2) ? true : false,
        isStudent: (action.payload.payload.tp === 3) ? true : false
      })
    }

  case userCostants.USER_LOGGING_IN:
    {
      console.log('Reducer: logging in')
      return Object.assign({}, state, {
        isLoading: true
      })
    }

  case adminCostants.USER_INSERTED:
    {
      return Object.assign({}, state, {
        transactionTx: action.payload
      })
    }

  case userCostants.USER_LOGGED_OUT:
    {
      return Object.assign({}, state, {
        data: null,
        isLoading: null,
        isAdmin: null,
        isUni: null,
        isProf: null,
        isStudent: null,
        metamask: null
      })
    }
  case userCostants.TRYING_METAMASK:
    {
      return {
        ...state,
        metamask: true
      }
    }
  }
}

export default userReducer