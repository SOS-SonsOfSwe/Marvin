import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import LoadingIPFSData from '../../../Loading/LoadingIpfs'
import EmptyData from '../../../Loading/EmptyData'

const Row = ({ teacher, examUnicode, load, isActive }) => (
    <tr className="clickable-row">
        <td>{examUnicode}</td>
        <td>{teacher}</td>
        <td>{load && load.typology}</td>
        <td>{load && load.place}</td>
        <td>{load && load.date}</td>
        <td>{load && load.time}</td>
        <td style={isActive !== true ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}></td>
        <td>
            <button className="delete-link">
                <Link to={{
                    pathname: "/profile/exams/modify-teacher",
                    state: { examUnicode: examUnicode }
                }}>
                    Modify teacher </Link>
            </button>
        </td>
    </tr>
);

const OptionsC = ({ courseUnicode }) => (
    <option value={courseUnicode}> {courseUnicode} </option>
);

const OptionsY = ({ year }) => (
    <option value={year}> {year} </option>
);

const OptionsDC = ({ degreeUnicode }) => (
    <option value={degreeUnicode}> {degreeUnicode} </option>
);


class Exams extends React.Component {

    constructor(props) {
        super(props)

        this.onSelectChangeY = this.onSelectChangeY.bind(this);
        this.onSelectChangeDC = this.onSelectChangeDC.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

        this.state = {
            selectedYears: '',
            selectedDegreeCourse: '',
            selectedClass: ''
        }

    }

    onSelectChange(event) {
        this.setState({ selectedClass: event.target.value })
        if (this.state.selectedDegreeCourse !== '') this.props.readExamsData(event.target.value)


    }

    onSelectChangeY(event) {
        this.setState({ selectedYears: event.target.value })
        this.props.readDegreeData(event.target.value)
        this.setState({ selectedDegreeCourse: '' })

    }

    onSelectChangeDC(event) {
        this.setState({ selectedDegreeCourse: event.target.value })
        this.setState({ selectedClass: '' })

        if (this.state.selectedYears !== '') this.props.readCoursesData(this.state.selectedYears, event.target.value)

    }

    componentDidMount() {
        this.props.readAcademicData();
    }

    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const empty = this.props.emptyExams ? <EmptyData label='no data found on blockchain' /> : <div />
        //const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <div>
                {load}
                {ipfsLoad}
                {empty}
                {((this.props.loadingExams === false && this.props.loadingAcademic === false && this.props.loadingDegree === false & this.props.ipfsLoading !== true) || (this.state.selectedYears === "" || this.state.selectedDegreeCourse === "" || this.state.selectedClass === "")) &&
                    < main className='container'>
                        <div className="pure-u-1-1">
                            <h1>Exams</h1>
                            <p className="text-center">Here there is the list of the exams.</p>
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
                                    <label htmlFor="classes"> Select class </label>
                                    <select disabled={this.state.selectedYears === "" || this.state.selectedDegreeCourse === "" ? true : false} type="text" name="class" value={this.state.selectedClass} onChange={this.onSelectChange}>
                                        {<option value="select class" disabled={this.state.selectedClass === "" ? false : true}> -- select a class -- </option>}
                                        {console.log('this.props.classes: ' + JSON.stringify(this.props.classes))}
                                        {this.props.emptyClasses === false && this.props.successClasses === true &&
                                            this.props.classes.map((rowData, index) => <OptionsC key={index} {...rowData} />)}
                                    </select>
                                </fieldset>
                            </form>
                            {this.state.selectedYears !== "" && this.state.selectedDegreeCourse !== "" && this.state.selectedClass !== "" &&
                                <div>
                                    <div className="div_insert_button">
                                        <button className="insert-button pure-button pure-button-primary">
                                            <Link className="pure-link" to={{
                                                pathname: '/profile/exams/insert-exam',
                                                state: { Class: this.state.selectedClass }
                                            }}
                                            >Insert an exam</Link>
                                        </button>
                                    </div>
                                    {this.props.emptyExams === false && this.props.success === true &&
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="title-column">Exam unicode</th>
                                                    <th className="title-column">Teacher</th>
                                                    <th className="title-column">Typology</th>
                                                    <th className="title-column">Place</th>
                                                    <th className="title-column">Date</th>
                                                    <th className="title-column">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.exams.map((rowData, index) => <Row key={index} {...rowData} />)}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            }
                        </div>
                    </main>
                }
                {error}
            </div >
        )
    }
}

export default Exams;