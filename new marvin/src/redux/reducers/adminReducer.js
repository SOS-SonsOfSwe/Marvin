// adminReducer is a function which is used as a reducer from the store. In practice it's used to put all the infos
// inside the store, which will be accessed by "this.state.<reducerName>" with the "connect" statement

// importing the name of the actions
import { adminCostants } from './costants'

// initial state: data is null!
const initialState = {
  data: null
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
  case adminCostants.READ_DATA:
    {
      console.log('adminReducer: data read from database')
      return Object.assign({}, state, {
        data: action.payload
      })
    }
  }
}

export default adminReducer