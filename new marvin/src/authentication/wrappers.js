import {
  connectedRouterRedirect
} from 'redux-auth-wrapper/history3/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'

import {
  routerActions
} from 'react-router-redux'

import Loading from '../components/Loading/Loading'

const locationHelper = locationHelperBuilder({})

// Layout Component Wrappers

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/signup', //path in which it has to go if it's not authenticated
  authenticatedSelector: state => state.user.data !== null && state.user.data.payload.name !== null,
  authenticatingSelector: state => {
    console.log("wrapper UserIsAuthenticated is loading:", state.user.isLoading)
    return state.user.isLoading
  },
  AuthenticatingComponent: Loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile', //where to go if it's authenticated
  // redirectPath: (state, ownProps) => ownProps.location.query.redirect || '/signup',
  authenticatedSelector: state => state.user.data === null,
  authenticatingSelector: state => {
    console.log("wrapper UserIsNotAuthenticated is loading:", state.user.isLoading)
    return state.user.isLoading
  },
  AuthenticatingComponent: Loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
})

//for super admin
export const UniAdminIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => {
    if (state.user.data !== null && state.user.isAdmin) {
      console.log("You can do whatever you want!")
      return true;
    } else {
      console.log("You're a powerfullness user!")
      return false;
    }
  },
  // authenticatingSelector: state => {
  //   console.log("L'utente si sta loggando", state.user.isLoading)
  //   return state.user.isLoading
  // },
  // AuthenticatingComponent: Loading,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UniAdminIsAuthenticated'
})

//for managing the home page
export const UserIsWaiting = (Component, FailureComponent) => connectedAuthWrapper({
  authenticatedSelector: state => state.user.isLoading,
  wrapperDisplayName: 'UserIsWaiting',
  FailureComponent
})(Component)

//--------------------------------------------------------------------

// UI Component Wrappers || HIDING COMPONENTS

export const VisibleOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user.data !== null && !state.user.isAdmin,
  wrapperDisplayName: 'VisibleOnlyAuth',
  // FailureComponent: null // NOW OPTIONAL
})

export const HiddenOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user.data === null,
  wrapperDisplayName: 'HiddenOnlyAuth',
  // FailureComponent: null // NOW OPTIONAL
})

//for super admin
export const VisibleOnlyUniAdmin = connectedAuthWrapper({
  authenticatedSelector: state => state.user.isAdmin,
  wrapperDisplayName: 'VisibleOnlyUniAdmin',
  // FailureComponent: null // NOW OPTIONAL
})

export const VisibleOnlyUni = connectedAuthWrapper({
  authenticatedSelector: state => state.user.isUni,
  wrapperDisplayName: 'VisibleOnlyUni',
  // FailureComponent: null // NOW OPTIONAL
})

export const VisibleOnlyProf = connectedAuthWrapper({
  authenticatedSelector: state => state.user.isProf,
  wrapperDisplayName: 'VisibleOnlyProf',
  // FailureComponent: null // NOW OPTIONAL
})

export const VisibleOnlyStudent = connectedAuthWrapper({
  authenticatedSelector: state => state.user.isStudent,
  wrapperDisplayName: 'VisibleOnlyStudent',
  // FailureComponent: null // NOW OPTIONAL
})


// Applying to a function component for simplicity but could be Class or createClass component
// const AdminOnlyLink = VisibleOnlyAdmin(() => <Link to='/admin'>Admin Section</Link>)

//------------------------------------------------------------------------
// Alternate components
// export const adminOrElse = (Component, FailureComponent) => connectedAuthWrapper({
//   authenticatedSelector: state => state.user.isAdmin,
//   wrapperDisplayName: 'AdminOrElse',
//   FailureComponent
// })(Component)
// Show Admin dashboard to admins and user dashboard to regular users
// <Route path='/dashboard' component={adminOrElse(AdminDashboard, UserDashboard)} />