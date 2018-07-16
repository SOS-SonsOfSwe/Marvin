import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated, AdminIsAuthenticated, UserDataFetching, UniIsAuthenticated, StudentIsAuthenticated, TeacherIsAuthenticated } from './authentication/wrappers'
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
import DegreesContainer from './containers/Profile/Admin/Degrees/DegreesContainer'
import ClassesContainer from './containers/Profile/Admin/Classes/ClassesContainer'
import readAdminsContainer from './containers/Profile/Admin/AllUsers/readAdminsContainer'
import readTeachersContainer from './containers/Profile/Admin/AllUsers/readTeachersContainer'
// import Teachers from './components/Profile/Admin/Teachers/Teachers'
// import Students from './components/Profile/Admin/Students/Students'
import readStudentsContainer from './containers/Profile/Admin/AllUsers/readStudentsContainer'
import ExamsTeacherListContainer from './containers/Profile/Teacher/ExamsTeacherListContainer'
import ExamsStudentListContainer from './containers/Profile/Student/ExamsStudentListContainer'
import MarkedExamsContainer from './containers/Profile/Student/MarkedExamsContainer'
import SchoolRecordsContainer from './containers/Profile/Student/SchoolRecordsContainer'
import InsertAcademicYearContainer from './containers/Profile/Admin/AcademicYears/InsertAcademicYearContainer'
// import ModifyAcademicYear from './components/Profile/Admin/AcademicYears/ModifyAcademicYear'
// import DeleteAcademicYear from './component/Profile/Admin/AcademicYears/DeleteAcademicYear'
import DeleteAcademicYearContainer from './containers/Profile/Admin/AcademicYears/DeleteAcademicYearContainer'
import InsertDegreeContainer from './containers/Profile/Admin/Degrees/InsertDegreeContainer'
// import DeleteDegree from './components/Profile/Admin/Degrees/DeleteDegree'
import DeleteDegreeContainer from './containers/Profile/Admin/Degrees/DeleteDegreeContainer'
// import ModifyDegree from './components/Profile/Admin/Degrees/ModifyDegree';
import InsertClassContainer from './containers/Profile/Admin/Classes/InsertClassContainer'
import ModifyClass from './components/Profile/Admin/Classes/ModifyClass'
import { DeleteAdministratorContainer } from './containers/Profile/Admin/AllUsers/deleteUserContainer'
import { DeleteTeacherContainer } from './containers/Profile/Admin/AllUsers/deleteUserContainer'
import { DeleteStudentContainer } from './containers/Profile/Admin/AllUsers/deleteUserContainer'
// import DeleteTeacher from './components/Profile/Admin/Teachers/DeleteTeacher'
// import DeleteStudent from './components/Profile/Admin/Students/DeleteStudent'
import InsertExamContainer from './containers/Profile/Admin/Classes/InsertExamContainer'
import ExamsContainer from './containers/Profile/Admin/Classes/ExamsContainer';
import DeleteClassContainer from './containers/Profile/Admin/Classes/DeleteClassContainer';
import DeleteExamContainer from './containers/Profile/Admin/Classes/DeleteExamContainer'
import RegisteredStudentListContainer from './containers/Profile/Teacher/RegisteredStudentListContainer';
import costsContainer from './containers/costContainer'



import './index.scss'
// import "bootstrap/scss/bootstrap.scss" 


// Redux Store
import store from './store'




// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
  .then(results => {
    // console.log('Web3 initialized!')
  })
  .catch(() => {
    // console.log('Error in web3 initialization.')
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
            {/* <Route path="modify-academic-year" component={AdminIsAuthenticated(ModifyAcademicYear)} /> */}
            <Route path="delete-academic-year" component={AdminIsAuthenticated(DeleteAcademicYearContainer)} />
            <Route path="insert-degree" component={AdminIsAuthenticated(InsertDegreeContainer)} />
          </Route>

          <Route path="degrees">
            <IndexRoute component={AdminIsAuthenticated(DegreesContainer)} />
            <Route path="insert-degree" component={AdminIsAuthenticated(InsertDegreeContainer)} />
            {/* <Route path="modify-degree" component={AdminIsAuthenticated(ModifyDegree)} /> */}
            <Route path="delete-degree" component={AdminIsAuthenticated(DeleteDegreeContainer)} />
            <Route path="insert-class" component={AdminIsAuthenticated(InsertClassContainer)} />
          </Route>

          <Route path="classes">
            <IndexRoute component={AdminIsAuthenticated(ClassesContainer)} />
            <Route path="insert-class" component={AdminIsAuthenticated(InsertClassContainer)} />
            <Route path="modify-class" component={AdminIsAuthenticated(ModifyClass)} />
            <Route path="delete-class" component={AdminIsAuthenticated(DeleteClassContainer)} />
            <Route path="insert-exam" component={AdminIsAuthenticated(InsertExamContainer)} />
            <Route path="delete-exam" component={AdminIsAuthenticated(DeleteExamContainer)} />
          </Route>

          <Route path="exams">
            <IndexRoute component={AdminIsAuthenticated(ExamsContainer)} />
            <Route path="insert-exam" component={AdminIsAuthenticated(InsertExamContainer)} />
          </Route>

          <Route path="administrators">
            <IndexRoute component={UniIsAuthenticated(readAdminsContainer)} />
            <Route path="insert-user" component={UniIsAuthenticated(InsertUser)} />
            <Route path="delete-administrator" component={UniIsAuthenticated(DeleteAdministratorContainer)} />
          </Route>

          <Route path="teachers">
            <IndexRoute component={AdminIsAuthenticated((readTeachersContainer))} />
            <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
            <Route path="delete-teacher" component={AdminIsAuthenticated(DeleteTeacherContainer)} />
          </Route>

          <Route path="students">
            <IndexRoute component={AdminIsAuthenticated(readStudentsContainer)} />
            <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
            <Route path="delete-student" component={AdminIsAuthenticated(DeleteStudentContainer)} />
          </Route>

          <Route path="exams-list">
            <IndexRoute component={TeacherIsAuthenticated(ExamsTeacherListContainer)} />
            <Route path="student-list" component={TeacherIsAuthenticated(RegisteredStudentListContainer)} />
          </Route>
          <Route path="exams-student-list" component={StudentIsAuthenticated(ExamsStudentListContainer)} />
          <Route path="school-records" component={StudentIsAuthenticated(SchoolRecordsContainer)} />
          <Route path="marked-exams-student-list" component={StudentIsAuthenticated(MarkedExamsContainer)} />

        </Route>
        <Route path="costs" component={costsContainer} />
        <Route path="help" component={Help} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider >
),
  document.getElementById('root')
)
