import { adminCostants } from '../costants'

const initialState = {
  payload: null,
  loading: null,
  somethingChanged: null,
  success: null,
  empty: null
}

const didacticActivitiesReducer = (state = initialState, action) => {
  if(action.request === adminCostants.DIDACTIC_ACTIVITIES) {
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
        console.log('adminReducer: successfully fetched didactic activities data')
        // checking if somebody changed page during loading data, so the state.data is not overwritten by asynchronous returns
        // if(state.loading === false) return state
        return {
          ...state,
          payload: action.payload.load,
          // degreeCourses: state.degreeCourses,
          // didacticActivities: state.didacticActivities,
          success: true,
          empty: false,
          // we want to set this false so we can tell the components that they don't need to retrieve informations from blockchain but that from the store is enough
          somethingChanged: false,
          loading: false
        }
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
    case adminCostants.FETCH_DATA_EMPTY:
      {
        return {
          ...state,
          success: true,
          empty: true,
          loading: false
        }
      }
    }
  } else return state;
}
export default didacticActivitiesReducer