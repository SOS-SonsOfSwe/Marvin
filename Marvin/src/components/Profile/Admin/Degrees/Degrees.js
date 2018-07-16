import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import EmptyData from '../../../Loading/EmptyData'


const Row = ({ year, degreeUnicode, degreeData }) => (
    <tr className="clickable-row">
        <td>Academic year {year} </td>
        <td>{degreeUnicode}</td>
        <td>{degreeData}</td>
        <td>
            <Link to={{
                pathname: "/profile/classes/insert-class",
                state: { year: year, degreeUnicode: degreeUnicode }
            }}> Insert Class</Link>
        </td>
        <td>
            <Link to={{
                pathname: "/profile/degrees/delete-degree",
                state: { year: year, degreeUnicode: degreeUnicode }
            }}>
                <button className="delete-link">
                    <span className="X-button">X</span>Delete
            </button>
            </Link>
        </td>
    </tr>
);

const Options = ({ year }) => (
    <option value={year}> {year} </option>
);

class Degrees extends React.Component {
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
        const load = this.props.loadingDegree || this.props.loadingAcademic || this.props.ipfsLoading ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.emptyDegrees ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {empty}
                {/* {// console.log('loadingAcademic: ' + this.props.loadingAcademic + '\nloadingDegree: ' + this.props.loadingDegree)} */}
                {((this.props.loadingAcademic === false && this.props.loadingDegree === false && this.props.ipfsLoading !== true) || this.state.selectedYears === "") &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Degrees</h1>
                                <p className="text-center">List of the degrees.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label className="select-class" htmlFor="years"> Select academic year </label>
                                        <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChange}>
                                            {<option value="select year" disabled={this.state.selectedYears === "" ? false : true}> -- select an year -- </option>}
                                            {this.props.emptyAcademicYears === false &&
                                                this.props.academicYears.map((rowData, index) => <Options key={index} {...rowData} />)}
                                        </select>
                                    </fieldset>
                                </form>
                                {this.state.selectedYears !== "" &&
                                    <div>
                                        <div className="div_insert_button">
                                            <button className="insert-button pure-button pure-button-primary">
                                                <Link className="pure-link" to={{
                                                    pathname: "/profile/degrees/insert-degree",
                                                    state: { year: this.state.selectedYears }
                                                }} >Insert degree</Link>
                                            </button>
                                        </div>
                                        {this.props.emptyDegrees === false && this.props.success === true &&
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="title-column">Year</th>
                                                        <th className="title-column">Degree unicode</th>
                                                        <th className="title-column">Degree description</th>
                                                        <th className="title-column">Class</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.degrees.map((rowData, index) => <Row key={index} {...rowData} />)}
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

export default Degrees;