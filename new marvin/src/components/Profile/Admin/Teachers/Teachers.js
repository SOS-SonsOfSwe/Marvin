import React from 'react';
import { Link } from 'react-router'

var arrayData = [
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
]

const Row = ({ name, surname, badgeNumber, fiscalCode, univocalCode }) => (
    <tr className="clickable-row">
        <td>{name}</td>
        <td>{surname}</td>
        <td>{badgeNumber}</td>
        <td>{fiscalCode}</td>
        <td>{univocalCode}</td>
        <td>
            <button className="delete-link">
                <Link to="/profile/teachers/delete-teacher">Delete</Link>
            </button>
        </td>
    </tr>
);

class Teachers extends React.Component {
    render() {

        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Teachers</h1>
                    <p className="text-center">Here there is the list of the teachers.</p>
                    <div className="div_insert_button">
                        <button className="insert-button pure-button pure-button-primary">
                            <Link className="pure-link" to={{
                                pathname: '/insert-user',
                                state: { type: 2 }
                            }}>Insert a teacher</Link>
                        </button>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="title-column">Name</th>
                                <th className="title-column">Surname</th>
                                <th className="title-column">Badge number</th>
                                <th className="title-column">Fiscal code</th>
                                <th className="title-column">Univocal code</th>
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

export default Teachers;