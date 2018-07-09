import { userCostants } from '../costants'

// adminReducer is a function which is used as a reducer from the store. In practice it's used to put all the infos
// inside the store, which will be accessed by "this.state.<reducerName>" with the "connect" statement

// importing the name of the actions

// initial state: data is null, so there are three values for them: null, true, false
const initialState = {
  success: null,
  adding: null,
  somethingChanged: null
}

// this is a function used by the store (see index.js in this folder) which returns a new object containing the previous data and the new ones
// "action" in the payload present in the actions files, and is made of type (the type of the action) and its payload
const addingDataReducer = (state = initialState, action) => {
  switch(action.type) {
    // default: in this case we tried to make a dispatch without using matching any case
    default: {
      return state
    }

    // admin is adding data to its blockchain. We don't mind the type as the action is globally
    // understandable
  case userCostants.ADDING:
    {
      return {
        ...state,
        adding: true
      }
    }

    // adding was successfull. Time to unlock resources
  case userCostants.ADDED_NEW_DATA:
    {
      if(state.adding === false) return state
      return {
        ...state,
        adding: false,
        success: true,
        // we want to tell the entire store that something changed and that we have to retrieve all the new data.
        somethingChanged: true
      }
    }

    // there was an error trying to add some data. We have to manage it!
  case userCostants.ERROR_ADDING_NEW_DATA:
    {
      return {
        ...state,
        adding: false,
        success: false
      }
    }
  }
}

export default addingDataReducer