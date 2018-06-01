import { adminCostants } from './costants'

const initialState = {
  data: null
}

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    default: {
      return state
    }
  case adminCostants.READ_ACADEMIC_YEAR_DATA:
    {
      console.log(JSON.stringify(action.payload))
      console.log('adminReducer: reading data from database')
      return Object.assign({}, state, {
        data: action.payload
      })
    }
  }
}

export default adminReducer