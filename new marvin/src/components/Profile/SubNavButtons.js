import React from 'react'
import { VisibleOnlyUniAdmin, VisibleOnlyUni, VisibleOnlyProf, VisibleOnlyStudent } from '../../authentication/wrappers'
import { Link } from 'react-router'

const OnlyUniSubLinks = VisibleOnlyUni(() => {
    return (
        <li className="pure-menu-item">
            <Link to="/administrators" className="pure-menu-link">Administrators</Link>
        </li>
    )
})

const OnlyUniAdminSubLinks = VisibleOnlyUniAdmin(() => {
    return (
        <div>
            <div className="float-right-links">
                <ul>
                    <OnlyUniSubLinks />
                    <li className="pure-menu-item">
                        <Link to="/professors" className="pure-menu-link">Professors</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/students" className="pure-menu-link">Students</Link>
                    </li>
                </ul>
            </div>

            <div className="float-left-links">
                <ul>
                    <li className="pure-menu-item">
                        <Link to="/academic-years" className="pure-menu-link">Academic years</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/degree-courses" className="pure-menu-link">Degree courses</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/didactive-activities" className="pure-menu-link">Didactic activities</Link>
                    </li>
                    {/* <li className="pure-menu-item">
                        <Link to="/exams" className="pure-menu-link">Exams</Link>
                    </li> */}
                </ul>
            </div>
        </div>
    )
})

const OnlyProfSubLinks = VisibleOnlyProf(() => {
    return (
        <div>
            <ul>
                <li className="pure-menu-item">
                    <Link to="/exams-list" className="pure-menu-link">Exams list</Link>
                </li>
            </ul>
        </div>
    )
})

const OnlyStudentSubLinks = VisibleOnlyStudent(() => {
    return (
        <div>
            <ul>
                <li className="pure-menu-item">
                    <Link to="/exams-student-list" className="pure-menu-link">Your exams list</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/school-records" className="pure-menu-link">School records</Link>
                </li>
            </ul>
        </div>
    )
})

export { OnlyUniSubLinks, OnlyUniAdminSubLinks, OnlyProfSubLinks, OnlyStudentSubLinks }