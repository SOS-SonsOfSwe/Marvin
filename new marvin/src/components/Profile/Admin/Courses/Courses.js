import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import LoadingIPFSData from '../../../Loading/LoadingIpfs'
import EmptyData from '../../../Loading/EmptyData'


// var arrayData = [
//     { year: "2017-2018", degreeCourse: "Informatica", course: "Probabilità" },
//     { year: "2017-2018", degreeCourse: "Matematica", course: "Calcolo" },
//     { year: "2017-2018", degreeCourse: "Psicologia", course: "Comportamento" },
//     { year: "2017-2018", degreeCourse: "Ingegneria", course: "Analisi" },
//     { year: "2017-2018", degreeCourse: "Giurisprudenza", course: "Diritto" },
//     { year: "2016-2017", degreeCourse: "Informatica", course: "Probabilità" },
//     { year: "2016-2017", degreeCourse: "Matematica", course: "Calcolo" },
//     { year: "2016-2017", degreeCourse: "Psicologia", course: "Comportamento" },
// ]

// INSERT ALSO THE DESCRIPTION OF THE COURSE
const Row = ({ year, courseUnicode, courseData }) => (
    <tr className="clickable-row">
        <td>{courseUnicode}</td>
        <td>{courseData}</td>
        <td>
            <Link to="/profile/courses/insert-exam">Insert an exam</Link>
        </td>
        <td>
            <button className="modify-link">
                <Link to="/profile/courses/modify-course">Modify</Link>
            </button>
            <button className="delete-link">
                <Link to="/profile/courses/delete-course">Delete</Link>
            </button>
        </td>

    </tr>
);

const OptionsY = ({ year }) => (
    <option value={year}> {year} </option>
);

const OptionsDC = ({ degreeUnicode }) => (
    <option value={degreeUnicode}> {degreeUnicode} </option>
);
// CHANGE DEGREECOURSE IN DEGREEUNICODE, AS WE ARE WORKING WITH THEM

class Courses extends React.Component {
    constructor(props) {
        super(props)

        this.onSelectChangeY = this.onSelectChangeY.bind(this);
        this.onSelectChangeDC = this.onSelectChangeDC.bind(this);

        this.state = {
            selectedYears: '',
            selectedDegreeCourse: ''
        }
    }

    onSelectChangeY(event) {
        this.setState({ selectedYears: event.target.value })
        this.props.readDegreeData(event.target.value)
        this.setState({ selectedDegreeCourse: '' })

    }

    onSelectChangeDC(event) {
        this.setState({ selectedDegreeCourse: event.target.value })

        if (this.state.selectedYears !== '') this.props.readCoursesData(this.state.selectedYears, event.target.value)

    }

    componentDidMount() {
        this.props.readAcademicData();
    }


    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const empty = this.props.emptyCourses ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {ipfsLoad}
                {empty}
                {((this.props.loadingAcademic === false && this.props.loadingDegree === false && this.props.loadingCourses === false && this.props.ipfsLoading !== true) || (this.state.selectedYears === "" || this.state.selectedDegreeCourse === "")) &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Courses</h1>
                                <p className="text-center">Here there is the list of the Courses.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label htmlFor="years"> Select academic year </label>
                                        <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChangeY}>
                                            {<option value="select year" disabled={this.state.selectedYears === "" ? false : true}> -- select a year -- </option>}
                                            {this.props.emptyAcademicYears === false &&
                                                this.props.academicYears.map((rowData, index) => <OptionsY key={index} {...rowData} />)}
                                        </select>
                                        <label htmlFor="degreecourse"> Select degree course </label>
                                        <select disabled={this.state.selectedYears === "" ? true : false} type="text" name="degreecourse" value={this.state.selectedDegreeCourse} onChange={this.onSelectChangeDC}>
                                            {<option value="select degreeCourse" disabled={this.state.selectedDegreeCourse === "" ? false : true}> -- select a degree course -- </option>}
                                            {console.log('this.props.degreeCourses: ' + JSON.stringify(this.props.degreeCourses))}
                                            {this.props.emptyDegreeCourses === false && this.props.successDegree === true &&
                                                this.props.degreeCourses.map((rowData, index) => <OptionsDC key={index} {...rowData} />)}
                                        </select>
                                    </fieldset>
                                </form>
                                {this.state.selectedYears !== "" && this.state.selectedDegreeCourse !== "" &&
                                    <div>
                                        <div className="div_insert_button">
                                            <button className="insert-button pure-button pure-button-primary">
                                                <Link className="pure-link" to={{
                                                    pathname: "/profile/courses/insert-course",
                                                    state: { year: this.state.selectedYears, degreeUnicode: this.state.selectedDegreeCourse }
                                                }}> Insert Course </Link>
                                            </button>
                                        </div>
                                        {this.props.emptyCourses === false && this.props.success === true &&
                                            < table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="title-column">Course</th>
                                                        <th className="title-column">Description</th>
                                                        <th className="title-column">Exam</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.courses.map((rowData, index) => <Row key={index} {...rowData} />)}
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                }
                            </div>
                        </main>
                    </div>
                }
                {error}
            </div>
        )
    }
}

export default Courses;