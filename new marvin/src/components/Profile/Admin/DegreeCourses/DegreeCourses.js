import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'

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

const Row = ({ year, name }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>{name}</td>
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
        console.log(this.state.selectedYears)
    }




    render() {
        const load = this.props.loading !== false ? <LoadingData label='Loading...' /> : <div />;
        const error = !this.props.success && this.props.loading === false ? <div>There was an error...</div> : <div />;

        return (
            <div>
                <select name="years" value={this.state.selectedYears} onChange={this.onSelectChange}>
                    <option value="2017-2018"> 2017-2018 </option>
                    <option value="2016-2017"> 2016-2017 </option>
                </select>
                {load}
                {!this.props.loading && this.props.success &&
                    <main className='container'>
                        <div className="pure-u-1-1">
                            <h1>Degree courses</h1>
                            <p className="text-center">Here there is the list of the degree courses.</p>
                            <button className="insert-button pure-button pure-button-primary">
                                <Link to="/profile/degree-courses/insert-degree-course">Insert degree course</Link>
                            </button>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="title-column">Year</th>
                                        <th className="title-column">Degree course</th>
                                        <th className="title-column">Didactic activity</th>
                                    </tr>
                                </thead>
                                <tbody>
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

export default DegreeCourses;