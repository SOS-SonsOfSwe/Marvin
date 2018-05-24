import * as costants from './costants'

const initialState = {
  data: null,
  isLoading: false,
  isAdmin: false
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    default: {
      return state
    }

  case costants.USER_LOGGED_IN:
    {
      // Object.assign creates a new object with the informations of the previous one. Use this for referene: 
      // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      // So it returns a new object - as redux works - with all the informations from state, with the new ones which are passed from action.payload
      console.log('Reducer: logged in')
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        isAdmin: ((action.payload.payload.tp === 4) || (action.payload.payload.tp === 1)) ? true : false
      })
    }

  case costants.USER_LOGGING_IN:
    {
      console.log('Reducer: logging in')
      return Object.assign({}, state, {
        isLoading: true
      })
    }

  case costants.USER_INSERTED:
    {
      return Object.assign({}, state, {
        transactionTx: action.payload
      })
    }

  case costants.USER_LOGGED_OUT:
    {
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        isAdmin: false
      })
    }
  }
}

export default userReducer