import { connectedReduxRedirect } from 'redux-auth-wrapper/history3/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
// import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
//import { replace } from 'react-router-redux'

import { routerActions } from 'react-router-redux'

import LoadingData from '../components/Loading/LoadingData'
// import LoadingData from '../components/Loading/LoadingData'

// const locationHelper = locationHelperBuilder({})

// Layout Component Wrappers

export const UserIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/signup', //path in which it has to go if it's not authenticated
  authenticatedSelector: state => state.user.data !== null && state.user.data.payload.name !== null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = connectedReduxRedirect({
  // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile', //where to go if it's authenticated
  // redirectPath: (state, ownProps) => ownProps.location.query.redirect || '/signup',
  redirectPath: '/',
  authenticatedSelector: state => state.user.data === null || state.admin.data === null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
})

//for admin
export const AdminIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.data !== null && state.user.isAdmin,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'AdminIsAuthenticated'
})

//for uni-admin
export const UniIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.data !== null && state.user.isUni,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UniIsAuthenticated'
})

export const TeacherIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.data !== null && state.user.isProf,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'TeacherIsAuthenticated'
})

export const StudentIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.data !== null && state.user.isStudent,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'StudentIsAuthenticated'
})

//for managing the home page
export const UserDataFetching = (Component, FailureComponent = LoadingData) => connectedAuthWrapper({
  authenticatedSelector: state => !state.user.isLoading,
  wrapperDisplayName: 'UserDataFetching',
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