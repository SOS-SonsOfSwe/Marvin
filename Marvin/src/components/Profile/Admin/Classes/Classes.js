import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import LoadingIPFSData from '../../../Loading/LoadingIpfs'
import EmptyData from '../../../Loading/EmptyData'


// var arrayData = [
//     { year: "2017-2018", degree: "Informatica", class: "Probabilità" },
//     { year: "2017-2018", degree: "Matematica", class: "Calcolo" },
//     { year: "2017-2018", degree: "Psicologia", class: "Comportamento" },
//     { year: "2017-2018", degree: "Ingegneria", class: "Analisi" },
//     { year: "2017-2018", degree: "Giurisprudenza", class: "Diritto" },
//     { year: "2016-2017", degree: "Informatica", class: "Probabilità" },
//     { year: "2016-2017", degree: "Matematica", class: "Calcolo" },
//     { year: "2016-2017", degree: "Psicologia", class: "Comportamento" },
// ]

const Row = ({ degreeUnicode, classUnicode, classData, teacher }) => (
    <tr className="clickable-row">
        <td>{classUnicode}</td>
        <td>{classData}</td>
        <td>{teacher}</td>
        <td>
            <Link to={{
                pathname: "/profile/exams/insert-exam",
                state: { Class: classUnicode }
            }}>Insert an exam</Link>
        </td>
        <td>
            <button className="modify-link">
                <Link to="/profile/classes/modify-class">Modify</Link>
            </button>
            <button className="delete-link">
                <Link to={{
                    pathname: "/profile/classes/delete-class",
                    state: { classUnicode: classUnicode, degreeUnicode: degreeUnicode }
                }}
                > <span className="X-button">X</span>Delete</Link>
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
// CHANGE DEGREE IN DEGREEUNICODE, AS WE ARE WORKING WITH THEM

class Classes extends React.Component {
    constructor(props) {
        super(props)

        this.onSelectChangeY = this.onSelectChangeY.bind(this);
        this.onSelectChangeDC = this.onSelectChangeDC.bind(this);

        this.state = {
            selectedYears: '',
            selectedDegree: ''
        }
    }

    onSelectChangeY(event) {
        this.setState({ selectedYears: event.target.value })
        this.props.readDegreeData(event.target.value)
        this.setState({ selectedDegree: '' })

    }

    onSelectChangeDC(event) {
        this.setState({ selectedDegree: event.target.value })

        if (this.state.selectedYears !== '') this.props.readClassesData(event.target.value)

    }

    componentDidMount() {
        this.props.readAcademicData();
    }


    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const empty = this.props.emptyClasses ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {ipfsLoad}
                {empty}
                {((this.props.loadingAcademic === false && this.props.loadingDegree === false && this.props.loadingClasses === false && this.props.ipfsLoading !== true) || (this.state.selectedYears === "" || this.state.selectedDegree === "")) &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Classes</h1>
                                <p className="text-center">Here there is the list of the Classes.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label htmlFor="years"> Select academic year </label>
                                        <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChangeY}>
                                            {<option value="select year" disabled={this.state.selectedYears === "" ? false : true}> -- select a year -- </option>}
                                            {this.props.emptyAcademicYears === false &&
                                                this.props.academicYears.map((rowData, index) => <OptionsY key={index} {...rowData} />)}
                                        </select>
                                        <label htmlFor="degree"> Select degree </label>
                                        <select disabled={this.state.selectedYears === "" ? true : false} type="text" name="degree" value={this.state.selectedDegree} onChange={this.onSelectChangeDC}>
                                            {<option value="select degree" disabled={this.state.selectedDegree === "" ? false : true}> -- select a degree -- </option>}
                                            {console.log('this.props.degrees: ' + JSON.stringify(this.props.degrees))}
                                            {this.props.emptyDegrees === false && this.props.successDegree === true &&
                                                this.props.degrees.map((rowData, index) => <OptionsDC key={index} {...rowData} />)}
                                        </select>
                                    </fieldset>
                                </form>
                                {this.state.selectedYears !== "" && this.state.selectedDegree !== "" &&
                                    <div>
                                        <div className="div_insert_button">
                                            <button className="insert-button pure-button pure-button-primary">
                                                <Link className="pure-link" to={{
                                                    pathname: "/profile/classes/insert-class",
                                                    state: { year: this.state.selectedYears, degreeUnicode: this.state.selectedDegree }
                                                }}> Insert Class </Link>
                                            </button>
                                        </div>
                                        {this.props.emptyClasses === false && this.props.success === true &&
                                            < table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="title-column">Class</th>
                                                        <th className="title-column">Description</th>
                                                        <th className="title-column">Teacher</th>
                                                        <th className="title-column">Exam</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.classes.map((rowData, index) => <Row key={index} {...rowData} />)}
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

export default Classes;