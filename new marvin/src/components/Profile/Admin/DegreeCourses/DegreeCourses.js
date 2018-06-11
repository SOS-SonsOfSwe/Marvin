import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import EmptyData from '../../../Loading/EmptyData'

// var arrayData = [
//     { year: "2017-2018", degreeCourse: "Informatica" },
//     { year: "2017-2018", degreeCourse: "Matematica" },
//     { year: "2017-2018", degreeCourse: "Psicologia" },
//     { year: "2017-2018", degreeCourse: "Ingegneria" },
//     { year: "2017-2018", degreeCourse: "Giurisprudenza" },
//     { year: "2016-2017", degreeCourse: "Informatica" },
//     { year: "2016-2017", degreeCourse: "Matematica" },
//     { year: "2016-2017", degreeCourse: "Psicologia" },
// ]

const Row = ({ year, degreeUnicode, degreeDescription }) => (
    <tr className="clickable-row">
        <td>Academic year {year + "-" + (parseInt(year, 10) + 1).toString()} </td>
        <td>{degreeUnicode}</td>
        <td>{degreeDescription}</td>
        <td>
            <Link to="/profile/degree-courses/insert-didactic-activity">Insert didactic activity</Link>
        </td>
        <td>
            <button className="modify-link">
                <Link to="/profile/degree-courses/modify-degree-course">Modify</Link>
            </button>
            <button className="delete-link">
                <Link to="/profile/degree-courses/delete-degree-course">Delete</Link>
            </button>
        </td>
    </tr>
);

const Options = ({ year }) => (
    <option value={year}> {year} </option>
);

class DegreeCourses extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            selectedYears: '2017-2018'
        }
    }

    onSelectChange(event) {
        this.setState({ selectedYears: event.target.value },
            () => this.props.readDegreeData(this.state.selectedYears))
    }

    componentDidMount() {
        this.props.readDegreeData(this.state.selectedYears)
        this.props.readAcademicData();
    }




    render() {
        const load = this.props.loadingDegree || this.props.loadingAcademic ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.emptyDegreeCourses ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {empty}
                {/* {console.log('loadingAcademic: ' + this.props.loadingAcademic + '\nloadingDegree: ' + this.props.loadingDegree)} */}
                {this.props.loadingAcademic === false && this.props.loadingDegree === false &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Degree courses</h1>
                                <p className="text-center">Here there is the list of the degree courses.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label htmlFor="years"> Select academic year </label>
                                        <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChange}>
                                            {/* <option value="2017-2018"> 2017-2018 </option>
                                            <option value="2016-2017"> 2016-2017 </option> */}
                                            {this.props.emptyAcademicYears === false &&
                                                this.props.academicYears.map((rowData, index) => <Options key={index} {...rowData} />)}
                                        </select>
                                    </fieldset>
                                </form>
                                <button className="insert-button pure-button pure-button-primary">
                                    <Link to="/profile/degree-courses/insert-degree-course">Insert degree course</Link>
                                </button>
                                {this.props.emptyDegreeCourses === false && this.props.success === true &&
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="title-column">Year</th>
                                                <th className="title-column">Degree unicode</th>
                                                <th className="title-column">Degree description</th>
                                                <th className="title-column">Didactic activity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.degreeCourses.map((rowData, index) => <Row key={index} {...rowData} />)}
                                        </tbody>
                                    </table>
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

export default DegreeCourses;