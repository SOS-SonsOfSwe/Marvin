import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'
import EmptyData from '../../../Loading/EmptyData'

const Row = ({ year }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>
            <Link to={{
                pathname: "/profile/degrees/insert-degree",
                state: { year: year }
            }} > Insert degree</Link>
        </td>
        <td>
            <button className="delete-link">
                <Link to={{
                    pathname: "/profile/academic-years/delete-academic-year",
                    state: { year: year }
                }}><span className="X-button">X</span>Delete</Link>
            </button>
        </td>

    </tr>
);

class AcademicYears extends React.Component {
    componentDidMount() {
        // so we do not re load the page if the user has just deleted an academic year.
        // null is the value of the initial state and it is different from false.
        // if (this.props.justDeleted !== true)
        this.props.readAcademicData()
    }

    render() {
        const load = this.props.loading ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.empty ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {empty}
                {/* executing this field only if the loading is false. Pay attention to the exact value: avoid doing "something !== false", instead use "something===true" as "null" is a third value */}
                {this.props.loading === false &&
                    <main className='container'>
                        <div className="pure-u-1-1">
                            <h1>Academic years</h1>
                            <p className="text-center">List of the academic years.</p>
                            <div className="div_insert_button">
                                <Link className="pure-link" to="/profile/academic-years/insert-academic-year">
                                    <button className="insert-button pure-button pure-button-primary">
                                        Insert academic year
                                </button>
                                </Link>
                            </div>
                            {this.props.empty === false && this.props.success === true &&
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="title-column">Year</th>
                                            <th className="title-column">Degree</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {// console.log('this.props.data.load: ' + this.props.data)} */}
                                        {/* {// console.log('component: AcademicYear. Data: this.props.data: ' + JSON.stringify(this.props.data))} */}
                                        {this.props.academicYears.map((rowData, index) => <Row key={index} {...rowData} />)}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </main>
                }
                {error}
            </div>
        )


    }
}

export default AcademicYears;