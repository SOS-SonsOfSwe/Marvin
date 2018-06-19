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
import DegreeCoursesContainer from './containers/Profile/Admin/DegreeCourses/DegreeCoursesContainer'
import CoursesContainer from './containers/Profile/Admin/Courses/CoursesContainer'
import Administrators from './components/Profile/Admin/onlyUniversity/Administrators/Administrators'
import Teachers from './components/Profile/Admin/Teachers/Teachers'
import Students from './components/Profile/Admin/Students/Students'
import ExamsTeacherList from './components/Profile/Teacher/ExamsTeacherList'
import ExamsStudentList from './components/Profile/Student/ExamsStudentList'
import SchoolRecords from './components/Profile/Student/SchoolRecords'
import InsertAcademicYearContainer from './containers/Profile/Admin/AcademicYears/InsertAcademicYearContainer'
import ModifyAcademicYear from './components/Profile/Admin/AcademicYears/ModifyAcademicYear'
import DeleteAcademicYear from './components/Profile/Admin/AcademicYears/DeleteAcademicYear'
import InsertDegreeCourse from './components/Profile/Admin/DegreeCourses/InsertDegreeCourse'
import DeleteDegreeCourse from './components/Profile/Admin/DegreeCourses/DeleteDegreeCourse'
import ModifyDegreeCourse from './components/Profile/Admin/DegreeCourses/ModifyDegreeCourse';
import InsertCourse from './components/Profile/Admin/Courses/InsertCourse'
import InsertExam from './components/Profile/Admin/Courses/InsertExam'
import ModifyCourse from './components/Profile/Admin/Courses/ModifyCourse'
import DeleteCourse from './components/Profile/Admin/Courses/DeleteCourse'
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
                <Route path="insert-degree-course" component={AdminIsAuthenticated(InsertDegreeCourse)} />
            </Route>

            <Route path="degree-courses">
                <IndexRoute component={AdminIsAuthenticated(DegreeCoursesContainer)} />
                <Route path="insert-degree-course" component={AdminIsAuthenticated(InsertDegreeCourse)} />
                <Route path="modify-degree-course" component={AdminIsAuthenticated(ModifyDegreeCourse)} />
                <Route path="delete-degree-course" component={AdminIsAuthenticated(DeleteDegreeCourse)} />
                <Route path="insert-course" component={AdminIsAuthenticated(InsertCourse)} />
            </Route>

            <Route path="courses">
                <IndexRoute component={AdminIsAuthenticated(CoursesContainer)} />
                <Route path="insert-course" component={AdminIsAuthenticated(InsertCourse)} />
                <Route path="modify-course" component={AdminIsAuthenticated(ModifyCourse)} />
                <Route path="delete-course" component={AdminIsAuthenticated(DeleteCourse)} />
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