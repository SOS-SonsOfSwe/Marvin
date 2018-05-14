import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

// Layout Component Wrappers

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/', // '/login' by default.
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/dashboard',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: user => user.data === null,
  allowRedirectBack: false
})

//for super admin
export const UniIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/', // '/login' by default.
  predicate: (data) => {
    if(data !== null && data.payload.tp === 4) {
      console.log("Registered as University")
      return true;
    }
    else{
      console.log("WTF")
      return false;
    }
  },
  wrapperDisplayName: 'UserIsAuthenticated'
})



// UI Component Wrappers

export const VisibleOnlyAuth = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'VisibleOnlyAuth',
  predicate: (user) => { 
    if(user.data && user.data.payload.tp !==4) return true;
    else return false;
  },
  FailureComponent: null
})

export const HiddenOnlyAuth = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'HiddenOnlyAuth',
  predicate: user => user.data === null,
  FailureComponent: null
})



//for super admin
export const VisibleOnlyUni = UserAuthWrapper({
  authSelector: state => state.user.data,
  wrapperDisplayName: 'VisibleOnlyUni',
  predicate: (data) => {
    if(data && data.payload.tp === 4) return true;
    else return false;
  },
  FailureComponent: null
})
