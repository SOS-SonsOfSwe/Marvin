import React from 'react';

var arrayData = [
    {didactiveActivity: "Probabilità", status: true, date: "10-06-2017", vote: "28"},
    {didactiveActivity: "Programmazione", status: false, date: null, vote: null},
    {didactiveActivity: "Analisi", status: true, date: "17-01-2017", vote: "24"},
    {didactiveActivity: "Algoritmi", status: true, date: "22-09-2016", vote: "19"},
    {didactiveActivity: "Sistemi operativibabilità", status: false, date: null, vote: null},
    {didactiveActivity: "Ricarca operativa", status: true, date: "04-07-2017", vote: "30"},
]


const Row = ({didactiveActivity, status, date, vote}) => (
    <tr className="clickable-row" >
        <td>{didactiveActivity}</td>
        <td>
            <button className="point-button" style={ status===true ? {backgroundColor:'green'} : {backgroundColor:'yellow'} }>{status}</button>
        </td>
        <td>{date}</td>
        <td>{vote}</td>
    </tr>
  );

  class SchoolRecords extends React.Component{

    render(){

        const rows = arrayData.map( (rowData, index) => <Row key={index} {...rowData} />);

        return(
            <main className='container'>
                <h1 className="s_records">School records</h1>
                <p className="text-center s_records">Here there is your school records with the exams that you've already passed</p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Didactive Activity</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Vote</th>
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

export default SchoolRecords;