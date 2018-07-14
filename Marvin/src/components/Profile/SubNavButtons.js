import React from 'react'
import { VisibleOnlyUniAdmin, VisibleOnlyUni, VisibleOnlyProf, VisibleOnlyStudent } from '../../authentication/wrappers'
import { Link } from 'react-router'


const OnlyUniSubLinks = VisibleOnlyUni(() => {
    return (
        <li className="pure-menu-item">
            <Link to="/profile/administrators" className="pure-menu-link">Administrators</Link>
        </li>
    )
})

const OnlyUniAdminSubLinks = VisibleOnlyUniAdmin(() => {
    return (
        <div className="external-menu">
            <div className="float-right-links">
                <ul>
                    <OnlyUniSubLinks />
                    <li className="pure-menu-item">
                        <Link to="/profile/teachers" className="pure-menu-link">Teachers</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/profile/students" className="pure-menu-link">Students</Link>
                    </li>
                </ul>
            </div>

            <div className="float-left-links">
                <ul>
                    <li className="pure-menu-item">
                        <Link to="/profile/academic-years" className="pure-menu-link">Academic years</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/profile/degrees" className="pure-menu-link">Degrees</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/profile/classes" className="pure-menu-link">Classes</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/profile/exams" className="pure-menu-link">Exams</Link>
                    </li>
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
                    <Link to="/profile/exams-list" className="pure-menu-link">Exams list</Link>
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
                    <Link to="/profile/exams-student-list" className="pure-menu-link">Your exams list</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/profile/school-records" className="pure-menu-link">School records</Link>
                </li>
            </ul>
        </div>
    )
})

export { OnlyUniSubLinks, OnlyUniAdminSubLinks, OnlyProfSubLinks, OnlyStudentSubLinks }