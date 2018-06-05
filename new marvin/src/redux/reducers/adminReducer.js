import { adminCostants } from './costants'

// adminReducer is a function which is used as a reducer from the store. In practice it's used to put all the infos
// inside the store, which will be accessed by "this.state.<reducerName>" with the "connect" statement

// importing the name of the actions

// initial state: data is null, so there are three values for them: null, true, false
const initialState = {
  data: null,
  loading: null,
  success: null,
  adding: null
}

// this is a function used by the store (see index.js in this folder) which returns a new object containing the previous data and the new ones
// "action" in the payload present in the actions files, and is made of type (the type of the action) and its payload
const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    // default: in this case we tried to make a dispatch without using matching any case
    default: {
      return state
    }

    // in this case the admin has dispatched an action of reading in "readAdminData.js"
    // admin is retrieving data from server, so the boolean variables work as expected
  case adminCostants.FETCHING_DATA:
    {
      console.log('adminReducer: reading data from database')
      return {
        ...state,
        loading: true,
      }
      // return Object.assign({}, state, {
      //   data: action.payload,
      //   loading: true,
      //   success: null
      // })
    }

    // server finished to give data successfully, so he can unlock resources
  case adminCostants.FETCH_DATA_SUCCESS:
    {
      console.log('adminReducer: successfully fetched data')
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true
      }
      // return Object.assign({}, state, {
      //   loading: false,
      //   success: true
      // })
    }

    // there were some errors, so we can manage them
  case adminCostants.FETCH_DATA_ERROR:
    {
      return {
        ...state,
        loading: false,
        success: false
      }
    }

    // time to clean up: call this action if you want to free space
  case adminCostants.ERASE_ADMIN_REDUCER:
    {
      return {
        ...state,
        data: null,
        loading: null,
        success: null,
        adding: null
      }
    }

    // admin is adding data to its blockchain. We don't mind the type as the action is globally
    // understandable
  case adminCostants.ADDING:
    {
      return {
        ...state,
        adding: true
      }
    }

    // adding was successfull. Time to unlock resources
  case adminCostants.ADDED_NEW_DATA:
    {
      return {
        ...state,
        adding: false,
        success: true
      }
    }

    // there was an error trying to add some data. We have to manage it!
  case adminCostants.ERROR_ADDING_NEW_DATA:
    {
      return {
        ...state,
        adding: false,
        success: false
      }
    }
  }
}

export default adminReducer