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

const Row = ({ examUnicode, classUnicode, load, teacher, hReg }) => (
    <tr className="clickable-row">
        <td>{classUnicode}</td>
        <td>{examUnicode}</td>
        <td>{load && load.type}</td>
        <td>{load && load.place}</td>
        <td>{load && load.date}</td>
        <td>{load && load.time}</td>
        <td>{teacher}</td>
        <td><fieldset><input type="button" value="subscribe" onClick={(e) => hReg(examUnicode, e)} />
        </fieldset>
        </td>
    </tr>
);

class ExamsStudentList extends React.Component {

    constructor(props) {
        super(props);

        this.handleReg = this.handleReg.bind(this);

    }

    handleReg(examUnicode, event) {
        event.preventDefault();
        this.props.subscribe(examUnicode)
    }

    componentDidMount() {
        // so we do not re load the page if the user has just deleted an academic year.
        // null is the value of the initial state and it is different from false.
        // if (this.props.justDeleted !== true)
        this.props.readExams(this.props.badgeNumber)
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
                    {this.props.empty === false && this.props.success === true &&
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="title-column">Class unicode</th>
                                    <th className="title-column">Exam unicode</th>
                                    <th className="title-column">Type</th>
                                    <th className="title-column">Place</th>
                                    <th className="title-column">Date</th>
                                    <th className="title-column">Time</th>
                                    <th className="title-column">Teacher</th>
                                    <th className="title-column">Subscribe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.exams.map((rowData, index) => <Row key={index} {...rowData} hReg={this.handleReg} />)}
                            </tbody>
                        </table>
                    }


                </main>
                {error}
            </div>
        )
    }
}

export default ExamsStudentList;