import React from 'react';
import { Link } from 'react-router'

// var arrayData = [
//     { year: "2017-2018", degreeCourse: "Informatica", didacticActivity: "Probabilità" },
//     { year: "2017-2018", degreeCourse: "Matematica", didacticActivity: "Calcolo" },
//     { year: "2017-2018", degreeCourse: "Psicologia", didacticActivity: "Comportamento" },
//     { year: "2017-2018", degreeCourse: "Ingegneria", didacticActivity: "Analisi" },
//     { year: "2017-2018", degreeCourse: "Giurisprudenza", didacticActivity: "Diritto" },
//     { year: "2016-2017", degreeCourse: "Informatica", didacticActivity: "Probabilità" },
//     { year: "2016-2017", degreeCourse: "Matematica", didacticActivity: "Calcolo" },
//     { year: "2016-2017", degreeCourse: "Psicologia", didacticActivity: "Comportamento" },
// ]

const Row = ({ year, degreeCourse, didacticActivity }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>{degreeCourse}</td>
        <td>{didacticActivity}</td>
        <td>
            <Link to="/profile/didactic-activities/insert-exam">Insert an exam</Link>
        </td>
        <td>
            <button className="modify-link">
                <Link to="/profile/didactic-activities/modify-didactic-activity">Modify</Link>
            </button>
            <button className="delete-link">
                <Link to="/profile/didactic-activities/delete-didactic-activity">Delete</Link>
            </button>
        </td>
    </tr>
);

class DidacticActivities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            didacticActivitiesData: 'nothing'
        }

        this.props.readDidacticActivitiesData()
    }


    render() {
        var arrayData = Object.values(this.state.didacticActivitiesData);
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Didactic activities</h1>
                    <p className="text-center">Here there is the list of the didactic activities.</p>
                    <button className="insert-button pure-button pure-button-primary">
                        <Link to="/profile/didactic-activities/insert-didactic-activity"> Insert didactic activity </Link>
                    </button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="title-column">Year</th>
                                <th className="title-column">Degree course</th>
                                <th className="title-column">Didactic activity</th>
                                <th className="title-column">Exam</th>
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

export default DidacticActivities;