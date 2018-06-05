import React from 'react';
import { Row } from '../Commons/ExamList';

var arrayData = [
    { degreeCourse: "informatica", didacticActivity: "Analisi", typology: "scritto", date: "20-06-2018" },
    { degreeCourse: "informatica", didacticActivity: "Analisi", typology: "orale", date: "22-06-2018" },
    { degreeCourse: "informatica", didacticActivity: "Calcolo numerico", typology: "scritto", date: "28-07-2018" },
    { degreeCourse: "informatica", didacticActivity: "Calcolo numerico", typology: "laboratorio", date: "01-08-2018" },
    { degreeCourse: "ingegneria", didacticActivity: "Calcolo numerico", typology: "scritto", date: "25-07-2018" },
    { degreeCourse: "ingegneria", didacticActivity: "Calcolo numerico", typology: "laboratorio", date: "27-08-2018" },
]

class ExamsProfessorList extends React.Component {
    render() {

        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <h1>Exams associated to you</h1>
                <p className="text-center">Here there are the list of exams associated to you</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Degree Course</th>
                            <th>Didactic Activity</th>
                            <th>Typology</th>
                            <th>Date</th>
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

export default ExamsProfessorList;

