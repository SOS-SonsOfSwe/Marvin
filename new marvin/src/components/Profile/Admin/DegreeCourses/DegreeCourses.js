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

        <div className="float-right">

            <button className="insert-table-button">

                <Link to="/profile/degree-courses/insert-didactic-activity">Insert didactic activity</Link>

            </button>

            <Link to="/profile/degree-courses/modify-degree-course">Modify</Link>

            <Link to="/profile/degree-courses/delete-degree-course">Delete</Link>

        </div>

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
                    <button className="insert-button">
                        <Link to="/profile/degree-courses/insert-degree-course">Insert degree course</Link>
                    </button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Degree course</th>
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