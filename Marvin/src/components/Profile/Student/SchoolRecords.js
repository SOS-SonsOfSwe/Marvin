// import React from 'react';

// var arrayData = [
//     {didactiveActivity: "Probabilità", status: true, date: "10-06-2017", vote: "28"},
//     {didactiveActivity: "Programmazione", status: false, date: null, vote: null},
//     {didactiveActivity: "Analisi", status: true, date: "17-01-2017", vote: "24"},
//     {didactiveActivity: "Algoritmi", status: true, date: "22-09-2016", vote: "19"},
//     {didactiveActivity: "Sistemi operativibabilità", status: false, date: null, vote: null},
//     {didactiveActivity: "Ricarca operativa", status: true, date: "04-07-2017", vote: "30"},
// ]


// const Row = ({didactiveActivity, status, date, vote}) => (
//     <tr className="clickable-row" >
//         <td>{didactiveActivity}</td>
//         <td>
//             <button className="point-button" style={ status===true ? {backgroundColor:'green'} : {backgroundColor:'yellow'} }>{status}</button>
//         </td>
//         <td>{date}</td>
//         <td>{vote}</td>
//     </tr>
//   );

//   class SchoolRecords extends React.Component{

//     render(){

//         const rows = arrayData.map( (rowData, index) => <Row key={index} {...rowData} />);

//         return(
//             <main className='container'>
//                 <h1 className="s_records">School records</h1>
//                 <p className="text-center s_records">Here there is your school records with the exams that you've already passed</p>
//                     <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th>Didactive Activity</th>
//                                 <th>Status</th>
//                                 <th>Date</th>
//                                 <th>Vote</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {rows}
//                         </tbody>
//                     </table>
//             </main>
//         )
//     }
// }




// const Row = ({ classUnicode, classData, mark }) => (
//     <tr className="clickable-row">
//         <td>{classUnicode}</td>
//         <td>{classData}</td>
//         <td>{mark}</td>
//     </tr>
// )

import React from 'react';
import LoadingData from '../../Loading/LoadingData'
// import LoadingIPFSData from '../../Loading/LoadingIpfs'
import EmptyData from '../../Loading/EmptyData'

// var arrayData = [
//     { degree: "informatica", class: "Probabilità", typology: "orale", date: "20-06-2018" },
//     { degree: "informatica", class: "Programmazione", typology: "scritto", date: "11-06-2018" },
//     { degree: "informatica", class: "Analisi", typology: "laboratorio", date: "28-07-2018" },
//     { degree: "informatica", class: "Algoritmi", typology: "orale", date: "9-08-2018" },
//     { degree: "informatica", class: "Sistemi operativi", typology: "scritto", date: "25-07-2018" },
//     { degree: "informatica", class: "Ricarca operativa", typology: "scritto", date: "19-08-2018" },
// ]

const Row = ({ classUnicode, classData, mark }) => (
    <tr className="clickable-row">
        <td>{classUnicode}</td>
        <td>{classData}</td>
        <td>{mark}</td>
    </tr>
)

class SchoolRecords extends React.Component {
    componentDidMount() {
        // so we do not re load the page if the user has just deleted an academic year.
        // null is the value of the initial state and it is different from false.
        // if (this.props.justDeleted !== true)
        this.props.readBooklet()
    }


    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        // const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const empty = this.props.empty ? <EmptyData label='no data found on blockchain' /> : <div />
        //const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);
        // console.error('Payload: ' + JSON.stringify(this.props.exams))
        // console.error('success: ' + this.props.success)

        return (
            <div>
                {load}
                {/* {ipfsLoad} */}
                {empty}
                <main className='container'>
                    {this.props.empty === false && this.props.success === true && this.props.loading !== true &&
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="title-column">Class unicode</th>
                                    <th className="title-column">Description</th>
                                    <th className="title-column">Mark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.exams.map((rowData, index) => <Row key={index} {...rowData} badgeNumber={this.props.badgeNumber} hConf={this.handleConf} />)}
                            </tbody>
                        </table>
                    }


                </main>
                {error}
            </div >
        )
    }
}

export default SchoolRecords;