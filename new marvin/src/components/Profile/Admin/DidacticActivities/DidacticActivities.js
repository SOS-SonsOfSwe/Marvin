import React from 'react';
import { Link } from 'react-router'

var arrayData = [
    { year: "2017-2018", degreeCourse: "Informatica", didacticActivity: "Probabilità" },
    { year: "2017-2018", degreeCourse: "Matematica", didacticActivity: "Calcolo" },
    { year: "2017-2018", degreeCourse: "Psicologia", didacticActivity: "Comportamento" },
    { year: "2017-2018", degreeCourse: "Ingegneria", didacticActivity: "Analisi" },
    { year: "2017-2018", degreeCourse: "Giurisprudenza", didacticActivity: "Diritto" },
    { year: "2016-2017", degreeCourse: "Informatica", didacticActivity: "Probabilità" },
    { year: "2016-2017", degreeCourse: "Matematica", didacticActivity: "Calcolo" },
    { year: "2016-2017", degreeCourse: "Psicologia", didacticActivity: "Comportamento" },
]

const Row = ({ year, degreeCourse, didacticActivity }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>{degreeCourse}</td>
        <td>{didacticActivity}
            <div className="float-right">
                <button>
                    <Link to="/profile/didactic-activities/insert-exam">Insert an exam</Link>
                </button>
                <Link to="/profile/didactic-activities/modify-didactic-activity">Modify</Link>
                <Link to="/profile/didactic-activities/delete-didactic-activity">Delete</Link>
            </div>
        </td>
    </tr>
);

class DidacticActivities extends React.Component {
    render() {

        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <h1>Didactic activities</h1>
                <p className="text-center">Here there is the list of the didactic activities.</p>
                <button>
                    <Link to="/profile/didactic-activities/insert-didactic-activity" className="pure-menu-link"> Insert didactic activity </Link>
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Degree course</th>
                            <th>Didactic activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </main>
        )
    }
}

export default DidacticActivities;