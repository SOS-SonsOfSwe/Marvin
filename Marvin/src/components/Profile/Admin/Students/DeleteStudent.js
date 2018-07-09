import React from 'react';

var arrayData = [
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" }
]

const Row = ({ name, surname, badgeNumber, fiscalCode, univocalCode }) => (
    <div>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Badge number: {badgeNumber}</p>
        <p>Fiscal code: {fiscalCode}</p>
        <p>Univocal code: {univocalCode}</p>
    </div>
);

class DeleteStudent extends React.Component {

    render() {
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete student</h1>
                    <p>Are you sure you want to delete this student? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form">
                        <fieldset className="delete-fieldset">
                            {rows}
                            <div className="delete-div-buttons">
                                <button>Delete</button>
                                <button>Cancel</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteStudent;