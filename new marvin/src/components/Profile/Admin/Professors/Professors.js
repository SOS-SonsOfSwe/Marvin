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
        <td>{univocalCode}
            <div className="float-right">
                <Link to="/profile/professors/delete-professor">Delete</Link>
            </div>
        </td>
    </tr>
);

class Professors extends React.Component {
    render() {

        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <h1>Professors</h1>
                <p className="text-center">Here there is the list of the professors.</p>
                <button>
                    <Link to="/profile/professors/insert-user">Insert a professor</Link>
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Badge number</th>
                            <th>Fiscal code</th>
                            <th>Univocal code</th>
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

export default Professors;