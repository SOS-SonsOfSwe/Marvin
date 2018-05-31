import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated, UniAdminIsAuthenticated, UserIsWaiting } from './authentication/wrappers'
import getWeb3 from '../api/utils/getWeb3'
// Layouts

//import { App, Home, InsertUser, Loading, NotFound, Profile, SignUp } from './components'

import App from './components/App/App'
import Home from './components/Home/Home'
import InsertUser from './components/InsertUser/InsertUser'
import Loading from './components/Loading/Loading'
import NotFound from './components/NotFound/NotFound'
import Profile from './components/Profile/Profile'
import SignUp from './components/SignUp/SignUp'
import Help from './components/Help/Help'

import AcademicYears from './components/Profile/Admin/AcademicYears/AcademicYears'
import DegreeCourses from './components/Profile/Admin/DegreeCourses/DegreeCourses'
import DidacticActivities from './components/Profile/Admin/DidacticActivities/DidacticActivities'
import Administrators from './components/Profile/Admin/onlyUniversity/Administrators/Administrators'
import Professors from './components/Profile/Admin/Professors/Professors'
import Students from './components/Profile/Admin/Students/Students'
import ExamsProfessorList from './components/Profile/Professor/ExamsProfessorList'
import ExamsStudentList from './components/Profile/Student/ExamsStudentList'
import SchoolRecords from './components/Profile/Student/SchoolRecords'
import InsertAcademicYear from './components/Profile/Admin/AcademicYears/InsertAcademicYear'

import './index.scss'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
  .then(results => {
    console.log('Web3 initialized!')
  })
  .catch(() => {
    console.log('Error in web3 initialization.')
  })

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={UserIsWaiting(Loading, Home)} />
        <Route path="insert-user" component={UniAdminIsAuthenticated(InsertUser)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} >

          <Route path="degree-courses" component={UserIsAuthenticated(DegreeCourses)} />
          <Route path="didactive-activities" component={UserIsAuthenticated(DidacticActivities)} />
          <Route path="administrators" component={UserIsAuthenticated(Administrators)} />
          <Route path="professors" component={UserIsAuthenticated(Professors)} />
          <Route path="students" component={UserIsAuthenticated(Students)} />
          <Route path="exams-list" component={(ExamsProfessorList)} />
          <Route path="exams-student-list" component={(ExamsStudentList)} />
          <Route path="school-records" component={(SchoolRecords)} />
          <Route path="academic-years" component={UserIsAuthenticated(AcademicYears)} >
            <Route path="insert-academic-year" component={UserIsAuthenticated(InsertAcademicYear)} />
          </Route>

        </Route>

        <Route path="help" component={Help} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
),
  document.getElementById('root')
)
