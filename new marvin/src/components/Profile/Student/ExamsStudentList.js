import React from 'react';
import { Row } from '../Commons/ExamList';

var arrayData = [
    { degreeCourse: "informatica", didacticActivity: "Probabilità", typology: "orale", date: "20-06-2018" },
    { degreeCourse: "informatica", didacticActivity: "Programmazione", typology: "scritto", date: "11-06-2018" },
    { degreeCourse: "informatica", didacticActivity: "Analisi", typology: "laboratorio", date: "28-07-2018" },
    { degreeCourse: "informatica", didacticActivity: "Algoritmi", typology: "orale", date: "9-08-2018" },
    { degreeCourse: "informatica", didacticActivity: "Sistemi operativi", typology: "scritto", date: "25-07-2018" },
    { degreeCourse: "informatica", didacticActivity: "Ricarca operativa", typology: "scritto", date: "19-08-2018" },
]

class ExamsStudentList extends React.Component {

    render() {

        const rows = arrayData.map((rowData) => <Row {...rowData} />);
        const rows2 = arrayData.map((rowData) => <Row {...rowData} />);

        return (
            <main className='container'>
                <h1>Exams to which you can register</h1>
                <p className="text-center">Here there are the list of your exams</p>
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

                <h1>Exams list to which you are already registered</h1>
                <p className="text-center">Here there are the list of the exams to which you are already registered</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Degree Course</th>
                            <th>Didactic Activities</th>
                            <th>Typology</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows2}
                    </tbody>
                </table>
            </main>
        )
    }
}

export default ExamsStudentList;