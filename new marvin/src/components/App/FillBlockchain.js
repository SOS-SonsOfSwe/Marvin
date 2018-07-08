import React from "react";
import * as data from '../../utils/adminData'
// import './Loading.scss'
// import loadingGif from '../../../public/media/loading.gif'
// taking year as parameter
import addNewAcademicYear from '../../redux/actions/Admin/AddAcademicYear'
// taking degree, year
import AddDegree from '../../redux/actions/Admin/AddDegree'
import AddClasses from '../../redux/actions/Admin/AddClass'

import { insertUser } from '../../redux/actions/Admin/InsertUserFormAction'
import { signUpUser } from '../../redux/actions/Login-logout-signup/SignUpFormActions'
import store from '../../store'
import { browserHistory } from 'react-router'

// Not found page component
export default class FillBlockchain extends React.Component {
    constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
    }
    handleSave(event) {
        event.preventDefault()
        for (let i of data.academicYears) {
            // this.props.addAcademicYear(i.year)
            store.dispatch(addNewAcademicYear(i.year))
        }
        for (let i of data.degrees) {
            store.dispatch(AddDegree(i.degreeUnicode, i.year, i.degreeData))
        }
        for (let i of data.classes) {
            store.dispatch(AddClasses(i.year, i.degreeUnicode, i.classUnicode, i.classData))
        }
        for (let i of data.insertUsers) {
            store.dispatch(insertUser(i.FC, i.UC, i.tp))
        }
        for (let i of data.signUpUsers) {
            store.dispatch(signUpUser(i))
        }

        browserHistory.push('/profile')
    }
    render() {
        return (
            <main className='container' onSubmit={this.handleSave}>
                <div className="pure-u-1-1">
                    <h1>So few data...</h1>
                    <p>Let me insert some data for you.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <div className="div-buttons fill_it_button">
                                <input type="submit" value="Fill it!" />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}