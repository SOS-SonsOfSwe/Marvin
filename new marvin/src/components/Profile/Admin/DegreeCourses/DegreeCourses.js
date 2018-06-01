import React from 'react';
import { Link } from 'react-router'

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

const Row = ({ year, degreeCourse }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>{degreeCourse}</td>
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
        this.state = {
            degreeCoursesData: 'componentState'
        }
        this.props.readDegreeData()

    }
    render() {
        var arrayData = Object.values(this.state.degreeCoursesData);
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
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
                            {rows}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }
}

export default DegreeCourses;