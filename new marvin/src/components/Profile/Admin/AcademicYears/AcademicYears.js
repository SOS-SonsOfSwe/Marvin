import React from 'react';
import { Link } from 'react-router'
// import LoadingData from '../../../Loading/LoadingData'

var arrayData = [
    { year: "2017-2018" },
    { year: "2016-2017" },
    { year: "2015-2016" },
    { year: "2014-2015" },
    { year: "2013-2014" },
]

const Row = ({ year }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>
            <Link to="/profile/academic-years/insert-degree-course">Insert degree course</Link>
        </td>
        <td>
            <button className="modify-link">
                <Link to="/profile/academic-years/modify-academic-year">Modify</Link>
            </button>
            <button className="delete-link">
                <Link to="/profile/academic-years/delete-academic-year">Delete</Link>
            </button>
        </td>

    </tr>
);

// function arrayDataMap(data) {
//     data.map((rowData, index) => <Row key={index} {...rowData} />)
// }

class AcademicYears extends React.Component {
    constructor(props) {
        super(props)
        this.props.readAcademicData()
        this.state = {
            loading: this.props.loading,
            success: this.props.success,
            academicYearsData: this.props.data
        }
    }

    // componentDidMount() {
    //     this.props.readAcademicData()
    //     this.setState({
    //         loading: this.props.loading,
    //         success: this.props.success,
    //         academicYearsData: this.props.data
    //     })
    // }

    render() {
        // console.log('AcademicYears data: ' + this.state.academicYearsData)
        // var arrayData = Object.values(this.state.academicYearsData);
        // const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        // USEFUL: const loading = this.state.loading !== false ? <LoadingData label='Loading...' /> : <div />;
        // USEFUL: const error = !this.state.success && this.state.loading === false ? <div>There was an error...</div> : <div />;

        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <div>
                {/* {loading} */}
                {/* {!this.state.loading && this.state.success && */}
                <main className='container'>
                    <div className="pure-u-1-1">
                        <h1>Academic years</h1>
                        <p className="text-center">Here there is the list of the academic years.</p>
                        <ul>
                            <button className="insert-button pure-button pure-button-primary">
                                <Link to="/profile/academic-years/insert-academic-year"> Insert academic year </Link>
                            </button>
                        </ul>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="title-column">Year</th>
                                    <th className="title-column">Degree course</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {arrayData = this.state.academicYearsData.load} */}
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </main>
                {/* } */}
                {/* {error} */}
            </div>
        )
    }
}

export default AcademicYears;