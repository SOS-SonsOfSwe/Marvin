import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'

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

class MainAcademicYears extends React.Component {
    render() {
        const load = this.props.loading !== false ? <LoadingData label='Loading...' /> : <div />;
        const error = !this.props.success && this.props.loading === false ? <div>There was an error...</div> : <div />;
        return (
            <div>
                {load}
                {!this.props.loading && this.props.success &&
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
                                    {console.log('this.props.data.load: ' + this.props.data)}
                                    {this.props.data.load.map((rowData, index) => <Row key={index} {...rowData} />)}
                                </tbody>
                            </table>
                        </div>
                    </main>
                }
                {error}
            </div>
        )


    }


}
class AcademicYears extends React.Component {
    componentDidMount() {
        this.props.readAcademicData()
    }

    render() {
        return (
            <div>
                {this.props.children || <MainAcademicYears loading={this.props.loading} success={this.props.success} data={this.props.data} />}
            </div>
        )
    }
}

export default AcademicYears;