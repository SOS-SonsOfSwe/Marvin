import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated, AdminIsAuthenticated, UserDataFetching, UniIsAuthenticated, StudentIsAuthenticated, ProfessorIsAuthenticated } from './authentication/wrappers'
import getWeb3 from '../api/utils/getWeb3'
// Layouts

//import { App, Home, InsertUser, Loading, NotFound, Profile, SignUp } from './components'

import App from './components/App/App'
import Home from './components/Home/Home'
import InsertUser from './components/InsertUser/InsertUser'
// import LoadingUser from './components/Loading/LoadingUser'
import NotFound from './components/NotFound/NotFound'
import ProfileContainer from './containers/Profile/ProfileContainer'
import SignUp from './components/SignUp/SignUp'
import Help from './components/Help/Help'

// import AcademicYears from './components/Profile/Admin/AcademicYears/AcademicYears'
import AcademicYears from './containers/Profile/Admin/AcademicYears/AcademicYearsContainer'
import DegreeCourses from './containers/Profile/Admin/DegreeCourses/DegreeCoursesContainer'
import DidacticActivities from './containers/Profile/Admin/DidacticActivities/DidacticActivitiesContainer'
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
import ModifyDegreeCourse from './components/Profile/Admin/DegreeCourses/ModifyDegreeCourse';
import InsertDidacticActivity from './components/Profile/Admin/DidacticActivities/InsertDidacticActivity'
import InsertExam from './components/Profile/Admin/DidacticActivities/InsertExam'
import ModifyDidacticActivity from './components/Profile/Admin/DidacticActivities/ModifyDidacticActivity'
import DeleteDidacticActivity from './components/Profile/Admin/DidacticActivities/DeleteDidacticActivity'
import DeleteAdministrator from './components/Profile/Admin/onlyUniversity/Administrators/DeleteAdministrator'
import DeleteProfessor from './components/Profile/Admin/Professors/DeleteProfessor'
import DeleteStudent from './components/Profile/Admin/Students/DeleteStudent'



import './index.scss'
// import "bootstrap/scss/bootstrap.scss" 


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
        <IndexRoute component={UserDataFetching(Home)} />
        <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(ProfileContainer)}>
          <Route path="academic-years" component={AdminIsAuthenticated(AcademicYears)}>
            <Route path="insert-academic-year" component={AdminIsAuthenticated(InsertAcademicYear)} />
            <Route path="modify-academic-year" component={AdminIsAuthenticated(ModifyAcademicYear)} />
            <Route path="delete-academic-year" component={AdminIsAuthenticated(DeleteAcademicYear)} />
            <Route path="insert-degree-course" component={AdminIsAuthenticated(InsertDegreeCourse)} />
          </Route>

          <Route path="degree-courses" component={AdminIsAuthenticated(DegreeCourses)}>
            <Route path="insert-degree-course" component={AdminIsAuthenticated(InsertDegreeCourse)} />
            <Route path="modify-degree-course" component={AdminIsAuthenticated(ModifyDegreeCourse)} />
            <Route path="delete-degree-course" component={AdminIsAuthenticated(DeleteDegreeCourse)} />
            <Route path="insert-didactic-activity" component={AdminIsAuthenticated(InsertDidacticActivity)} />
          </Route>

          <Route path="didactic-activities" component={AdminIsAuthenticated(DidacticActivities)}>
            <Route path="insert-didactic-activity" component={AdminIsAuthenticated(InsertDidacticActivity)} />
            <Route path="modify-didactic-activity" component={AdminIsAuthenticated(ModifyDidacticActivity)} />
            <Route path="delete-didactic-activity" component={AdminIsAuthenticated(DeleteDidacticActivity)} />
            <Route path="insert-exam" component={AdminIsAuthenticated(InsertExam)} />
          </Route>

          <Route path="administrators" component={UniIsAuthenticated(Administrators)}>
            <Route path="insert-user" component={UniIsAuthenticated(InsertUser)} />
            <Route path="delete-administrator" component={UniIsAuthenticated(DeleteAdministrator)} />
          </Route>

          <Route path="professors" component={AdminIsAuthenticated((Professors))}>
            <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
            <Route path="delete-professor" component={AdminIsAuthenticated(DeleteProfessor)} />
          </Route>

          <Route path="students" component={AdminIsAuthenticated(Students)}>
            <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
            <Route path="delete-student" component={AdminIsAuthenticated(DeleteStudent)} />
          </Route>

          <Route path="exams-list" component={ProfessorIsAuthenticated(ExamsProfessorList)} />
          <Route path="exams-student-list" component={StudentIsAuthenticated(ExamsStudentList)} />
          <Route path="school-records" component={StudentIsAuthenticated(SchoolRecords)} />

        </Route>
        <Route path="help" component={Help} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider >
),
  document.getElementById('root')
)
