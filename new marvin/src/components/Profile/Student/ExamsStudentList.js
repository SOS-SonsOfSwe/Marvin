import React from 'react';
import Row from '../Commons/ExamList';

var arrayData = [
    { degree: "informatica", class: "Probabilità", typology: "orale", date: "20-06-2018" },
    { degree: "informatica", class: "Programmazione", typology: "scritto", date: "11-06-2018" },
    { degree: "informatica", class: "Analisi", typology: "laboratorio", date: "28-07-2018" },
    { degree: "informatica", class: "Algoritmi", typology: "orale", date: "9-08-2018" },
    { degree: "informatica", class: "Sistemi operativi", typology: "scritto", date: "25-07-2018" },
    { degree: "informatica", class: "Ricarca operativa", typology: "scritto", date: "19-08-2018" },
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
                            <th>Degree</th>
                            <th>Class</th>
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
                            <th>Degree</th>
                            <th>Classes</th>
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