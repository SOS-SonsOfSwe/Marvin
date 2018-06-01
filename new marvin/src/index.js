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
import ProfileContainer from './containers/Profile/ProfileContainer'
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
import ModifyAcademicYear from './components/Profile/Admin/AcademicYears/ModifyAcademicYear'
import DeleteAcademicYear from './components/Profile/Admin/AcademicYears/DeleteAcademicYear'
import InsertDegreeCourse from './components/Profile/Admin/DegreeCourses/InsertDegreeCourse'
import DeleteDegreeCourse from './components/Profile/Admin/DegreeCourses/DeleteDegreeCourse'
import InsertDidacticActivity from './components/Profile/Admin/DidacticActivities/InsertDidacticActivity'
import InsertExam from './components/Profile/Admin/DidacticActivities/InsertExam'
import ModifyDidacticActivity from './components/Profile/Admin/DidacticActivities/ModifyDidacticActivity'
import DeleteDidacticActivity from './components/Profile/Admin/DidacticActivities/DeleteDidacticActivity'
import DeleteAdministrator from './components/Profile/Admin/onlyUniversity/Administrators/DeleteAdministrator'
import DeleteProfessor from './components/Profile/Admin/Professors/DeleteProfessor'
import DeleteStudent from './components/Profile/Admin/Students/DeleteStudent'


import './index.scss'

// Redux Store
import store from './store'
import ModifyDegreeCourse from './components/Profile/Admin/DegreeCourses/ModifyDegreeCourse';

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
        <Route path="profile">
          <IndexRoute component={UserIsAuthenticated(ProfileContainer)} />
          <Route path="degree-courses" component={UserIsAuthenticated(DegreeCourses)} />
          <Route path="didactive-activities" component={UserIsAuthenticated(DidacticActivities)} />
          <Route path="administrators" component={UserIsAuthenticated(Administrators)} />
          <Route path="professors" component={UserIsAuthenticated(Professors)} />
          <Route path="students" component={UserIsAuthenticated(Students)} />
          <Route path="exams-list" component={(ExamsProfessorList)} />
          <Route path="exams-student-list" component={(ExamsStudentList)} />
          <Route path="school-records" component={(SchoolRecords)} />

          <Route path="academic-years">
            <IndexRoute component={UserIsAuthenticated(AcademicYears)} />
            <Route path="insert-academic-year" component={UserIsAuthenticated(InsertAcademicYear)} />
            <Route path="modify-academic-year" component={UserIsAuthenticated(ModifyAcademicYear)} />
            <Route path="delete-academic-year" component={UserIsAuthenticated(DeleteAcademicYear)} />
            <Route path="insert-degree-course" component={UserIsAuthenticated(InsertDegreeCourse)} />
          </Route>

          <Route path="degree-courses">
            <IndexRoute component={UserIsAuthenticated(DegreeCourses)} />
            <Route path="insert-degree-course" component={UserIsAuthenticated(InsertDegreeCourse)} />
            <Route path="modify-degree-course" component={UserIsAuthenticated(ModifyDegreeCourse)} />
            <Route path="delete-degree-course" component={UserIsAuthenticated(DeleteDegreeCourse)} />
            <Route path="insert-didactic-activity" component={UserIsAuthenticated(InsertDidacticActivity)} />
          </Route>

          <Route path="insert-didactic-activity">
            <IndexRoute component={UserIsAuthenticated(InsertDidacticActivity)} />
            <Route path="insert-exam" component={UserIsAuthenticated(InsertExam)} />
          </Route>

          <Route path="didactic-activities">
            <IndexRoute component={UserIsAuthenticated(DidacticActivities)} />
            <Route path="insert-didactic-activity" component={UserIsAuthenticated(InsertDidacticActivity)} />
            <Route path="modify-didactic-activity" component={UserIsAuthenticated(ModifyDidacticActivity)} />
            <Route path="delete-didactic-activity" component={UserIsAuthenticated(DeleteDidacticActivity)} />
            <Route path="insert-exam" component={UserIsAuthenticated(InsertExam)} />
          </Route>

          <Route path="administrators">
            <IndexRoute component={UserIsAuthenticated(Administrators)} />
            <Route path="insert-user" component={UserIsAuthenticated(InsertUser)} />
            <Route path="delete-administrator" component={UserIsAuthenticated(DeleteAdministrator)} />
          </Route>

          <Route path="professors">
            <IndexRoute component={UserIsAuthenticated((Professors))} />
            <Route path="insert-user" component={UserIsAuthenticated(InsertUser)} />
            <Route path="delete-professor" component={UserIsAuthenticated(DeleteProfessor)} />
          </Route>

          <Route path="students">
            <IndexRoute component={UserIsAuthenticated(Students)} />
            <Route path="insert-user" component={UserIsAuthenticated(InsertUser)} />
            <Route path="delete-student" component={UserIsAuthenticated(DeleteStudent)} />
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
