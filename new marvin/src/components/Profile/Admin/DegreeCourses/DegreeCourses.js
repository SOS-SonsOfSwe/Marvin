import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import LoadingIPFSData from '../../../Loading/LoadingIpfs'
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

const Row = ({ year, degreeUnicode, degreeData }) => (
    <tr className="clickable-row">
        <td>Academic year {year + "-" + (parseInt(year, 10) + 1).toString()} </td>
        <td>{degreeUnicode}</td>
        <td>{degreeData}</td>
        <td>
            <Link to={{
                pathname: "/profile/courses/insert-course",
                state: { fromDegree: true, year: year, degreeUnicode: degreeUnicode }
            }}> Insert Course</Link>
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
            selectedYears: ''
        }
    }

    onSelectChange(event) {
        this.setState({ selectedYears: event.target.value })

        this.props.readDegreeData(event.target.value)
    }

    componentDidMount() {
        this.props.readAcademicData();
    }

    render() {
        const load = this.props.loadingDegree || this.props.loadingAcademic ? <LoadingData label='Loading...' /> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.emptyDegreeCourses ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {ipfsLoad}
                {empty}
                {/* {console.log('loadingAcademic: ' + this.props.loadingAcademic + '\nloadingDegree: ' + this.props.loadingDegree)} */}
                {((this.props.loadingAcademic === false && this.props.loadingDegree === false && this.props.ipfsLoading !== true) || this.state.selectedYears === "") &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Degree courses</h1>
                                <p className="text-center">Here there is the list of the degree courses.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label htmlFor="years"> Select academic year </label>
                                        <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChange}>
                                            {<option value="select year" disabled={this.state.selectedYears === "" ? false : true}> -- select an year -- </option>}
                                            {this.props.emptyAcademicYears === false &&
                                                this.props.academicYears.map((rowData, index) => <Options key={index} {...rowData} />)}
                                        </select>
                                    </fieldset>
                                </form>
                                {this.state.selectedYears !== "" &&
                                    <div>
                                        <button className="insert-button pure-button pure-button-primary">
                                            <Link to={{
                                                pathname: "/profile/degree-courses/insert-degree-course",
                                                state: { year: this.state.selectedYears }
                                            }} >Insert degree course</Link>
                                        </button>
                                        {this.props.emptyDegreeCourses === false && this.props.success === true &&
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="title-column">Year</th>
                                                        <th className="title-column">Degree unicode</th>
                                                        <th className="title-column">Degree description</th>
                                                        <th className="title-column">Course</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.degreeCourses.map((rowData, index) => <Row key={index} {...rowData} />)}
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

export default DegreeCourses;