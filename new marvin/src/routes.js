import React from 'react';
import { Route, IndexRoute } from 'react-router'
import ReactDOM from 'react-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated, AdminIsAuthenticated, UserDataFetching, UniIsAuthenticated, StudentIsAuthenticated, TeacherIsAuthenticated } from './authentication/wrappers'

import App from './components/App/App'
import Home from './components/Home/Home'
import InsertUser from './components/InsertUser/InsertUser'
// import LoadingUser from './components/Loading/LoadingUser'
import NotFound from './components/NotFound/NotFound'
import ProfileContainer from './containers/Profile/ProfileContainer'
import SignUp from './components/SignUp/SignUp'
import Help from './components/Help/Help'

// import AcademicYears from './components/Profile/Admin/AcademicYears/AcademicYears'
import AcademicYearsContainer from './containers/Profile/Admin/AcademicYears/AcademicYearsContainer'
import DegreesContainer from './containers/Profile/Admin/Degrees/DegreesContainer'
import ClassesContainer from './containers/Profile/Admin/Classes/ClassesContainer'
import Administrators from './components/Profile/Admin/onlyUniversity/Administrators/Administrators'
import Teachers from './components/Profile/Admin/Teachers/Teachers'
import Students from './components/Profile/Admin/Students/Students'
import ExamsTeacherList from './components/Profile/Teacher/ExamsTeacherList'
import ExamsStudentList from './components/Profile/Student/ExamsStudentList'
import SchoolRecords from './components/Profile/Student/SchoolRecords'
import InsertAcademicYearContainer from './containers/Profile/Admin/AcademicYears/InsertAcademicYearContainer'
import ModifyAcademicYear from './components/Profile/Admin/AcademicYears/ModifyAcademicYear'
import DeleteAcademicYear from './components/Profile/Admin/AcademicYears/DeleteAcademicYear'
import InsertDegree from './components/Profile/Admin/Degrees/InsertDegree'
import DeleteDegree from './components/Profile/Admin/Degrees/DeleteDegree'
import ModifyDegree from './components/Profile/Admin/Degrees/ModifyDegree';
import InsertClass from './components/Profile/Admin/Classes/InsertClass'
import InsertExam from './components/Profile/Admin/Classes/InsertExam'
import ModifyClass from './components/Profile/Admin/Classes/ModifyClass'
import DeleteClass from './components/Profile/Admin/Classes/DeleteClass'
import DeleteAdministrator from './components/Profile/Admin/onlyUniversity/Administrators/DeleteAdministrator'
import DeleteTeacher from './components/Profile/Admin/Teachers/DeleteTeacher'
import DeleteStudent from './components/Profile/Admin/Students/DeleteStudent'

const Routes = (props, store, history) => (
    <Route path="/" component={App}>
        <IndexRoute component={UserDataFetching(Home)} />
        <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(ProfileContainer)}>
            {/* <Route path="academic-years" component={AdminIsAuthenticated(AcademicYearsContainer)}> */}
            <Route path="academic-years">
                <IndexRoute component={AdminIsAuthenticated(AcademicYearsContainer)} />
                <Route path="insert-academic-year" component={AdminIsAuthenticated(InsertAcademicYearContainer)} />
                <Route path="modify-academic-year" component={AdminIsAuthenticated(ModifyAcademicYear)} />
                <Route path="delete-academic-year" component={AdminIsAuthenticated(DeleteAcademicYear)} />
                <Route path="insert-degree-class" component={AdminIsAuthenticated(InsertDegree)} />
            </Route>

            <Route path="degree-classes">
                <IndexRoute component={AdminIsAuthenticated(DegreesContainer)} />
                <Route path="insert-degree-class" component={AdminIsAuthenticated(InsertDegree)} />
                <Route path="modify-degree-class" component={AdminIsAuthenticated(ModifyDegree)} />
                <Route path="delete-degree-class" component={AdminIsAuthenticated(DeleteDegree)} />
                <Route path="insert-class" component={AdminIsAuthenticated(InsertClass)} />
            </Route>

            <Route path="classes">
                <IndexRoute component={AdminIsAuthenticated(ClassesContainer)} />
                <Route path="insert-class" component={AdminIsAuthenticated(InsertClass)} />
                <Route path="modify-class" component={AdminIsAuthenticated(ModifyClass)} />
                <Route path="delete-class" component={AdminIsAuthenticated(DeleteClass)} />
                <Route path="insert-exam" component={AdminIsAuthenticated(InsertExam)} />
            </Route>

            <Route path="administrators">
                <IndexRoute component={UniIsAuthenticated(Administrators)} />
                <Route path="insert-user" component={UniIsAuthenticated(InsertUser)} />
                <Route path="delete-administrator" component={UniIsAuthenticated(DeleteAdministrator)} />
            </Route>

            <Route path="teachers">
                <IndexRoute component={AdminIsAuthenticated((Teachers))} />
                <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
                <Route path="delete-teacher" component={AdminIsAuthenticated(DeleteTeacher)} />
            </Route>

            <Route path="students">
                <IndexRoute component={AdminIsAuthenticated(Students)} />
                <Route path="insert-user" component={AdminIsAuthenticated(InsertUser)} />
                <Route path="delete-student" component={AdminIsAuthenticated(DeleteStudent)} />
            </Route>

            <Route path="exams-list" component={TeacherIsAuthenticated(ExamsTeacherList)} />
            <Route path="exams-student-list" component={StudentIsAuthenticated(ExamsStudentList)} />
            <Route path="school-records" component={StudentIsAuthenticated(SchoolRecords)} />

        </Route>
        <Route path="help" component={Help} />
        <Route path="*" component={NotFound} />
    </Route>
)

export default Routes