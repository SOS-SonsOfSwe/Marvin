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

import FillBlockchainContainer from './containers/App/FillBlockchainContainer'

// import AcademicYears from './components/Profile/Admin/AcademicYears/AcademicYears'
import AcademicYearsContainer from './containers/Profile/Admin/AcademicYears/AcademicYearsContainer'
import DegreeCoursesContainer from './containers/Profile/Admin/DegreeCourses/DegreeCoursesContainer'
import CoursesContainer from './containers/Profile/Admin/Courses/CoursesContainer'
import readAdminsContainer from './containers/Profile/Admin/AllUsers/readAdminsContainer'
import Professors from './components/Profile/Admin/Professors/Professors'
import Students from './components/Profile/Admin/Students/Students'
import ExamsProfessorList from './components/Profile/Professor/ExamsProfessorList'
import ExamsStudentList from './components/Profile/Student/ExamsStudentList'
import SchoolRecords from './components/Profile/Student/SchoolRecords'
import InsertAcademicYearContainer from './containers/Profile/Admin/AcademicYears/InsertAcademicYearContainer'
import ModifyAcademicYear from './components/Profile/Admin/AcademicYears/ModifyAcademicYear'
import DeleteAcademicYear from './components/Profile/Admin/AcademicYears/DeleteAcademicYear'
import InsertDegreeCourseContainer from './containers/Profile/Admin/DegreeCourses/InsertDegreeCourseContainer'
import DeleteDegreeCourse from './components/Profile/Admin/DegreeCourses/DeleteDegreeCourse'
import ModifyDegreeCourse from './components/Profile/Admin/DegreeCourses/ModifyDegreeCourse';
import InsertCourseContainer from './containers/Profile/Admin/Courses/InsertCourseContainer'
import InsertExam from './components/Profile/Admin/Courses/InsertExam'
import ModifyCourse from './components/Profile/Admin/Courses/ModifyCourse'
import DeleteCourse from './components/Profile/Admin/Courses/DeleteCourse'
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
        <Route path='fill-blockchain' component={UniIsAuthenticated(FillBlockchainContainer)} />
        <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(ProfileContainer)}>
          {/* <Route path="academic-years" component={AdminIsAuthenticated(AcademicYearsContainer)}> */}
          <Route path="academic-years">
            <IndexRoute component={AdminIsAuthenticated(AcademicYearsContainer)} />
            <Route path="insert-academic-year" component={AdminIsAuthenticated(InsertAcademicYearContainer)} />
            <Route path="modify-academic-year" component={AdminIsAuthenticated(ModifyAcademicYear)} />
            <Route path="delete-academic-year" component={AdminIsAuthenticated(DeleteAcademicYear)} />
            <Route path="insert-degree-course" component={AdminIsAuthenticated(InsertDegreeCourseContainer)} />
          </Route>

          <Route path="degree-courses">
            <IndexRoute component={AdminIsAuthenticated(DegreeCoursesContainer)} />
            <Route path="insert-degree-course" component={AdminIsAuthenticated(InsertDegreeCourseContainer)} />
            <Route path="modify-degree-course" component={AdminIsAuthenticated(ModifyDegreeCourse)} />
            <Route path="delete-degree-course" component={AdminIsAuthenticated(DeleteDegreeCourse)} />
            <Route path="insert-course" component={AdminIsAuthenticated(InsertCourseContainer)} />
          </Route>

          <Route path="courses">
            <IndexRoute component={AdminIsAuthenticated(CoursesContainer)} />
            <Route path="insert-course" component={AdminIsAuthenticated(InsertCourseContainer)} />
            <Route path="modify-course" component={AdminIsAuthenticated(ModifyCourse)} />
            <Route path="delete-course" component={AdminIsAuthenticated(DeleteCourse)} />
            <Route path="insert-exam" component={AdminIsAuthenticated(InsertExam)} />
          </Route>

          <Route path="administrators">
            <IndexRoute component={UniIsAuthenticated(readAdminsContainer)} />
            <Route path="insert-user" component={UniIsAuthenticated(InsertUser)} />
            <Route path="delete-administrator" component={UniIsAuthenticated(DeleteAdministrator)} />
          </Route>

          <Route path="professors">
            <IndexRoute component={AdminIsAuthenticated((Professors))} />
            <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
            <Route path="delete-professor" component={AdminIsAuthenticated(DeleteProfessor)} />
          </Route>

          <Route path="students">
            <IndexRoute component={AdminIsAuthenticated(Students)} />
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
