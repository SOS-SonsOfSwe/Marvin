import { browserHistory } from 'react-router'
// import { ERASE_ADMIN_REDUCER } from '../../reducers/costants/adminCostants'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

// function eraseData() {
//   return {
//     type: ERASE_ADMIN_REDUCER
//   }
// }

export function logoutUser() {
  return function (dispatch) {
    // Logout user.

    dispatch(userLoggedOut())
    // dispatch(eraseData())
    // Redirect home.
    return browserHistory.push('/')
  }
}