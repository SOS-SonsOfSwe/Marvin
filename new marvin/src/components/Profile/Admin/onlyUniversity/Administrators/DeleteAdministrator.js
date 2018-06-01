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

class DeleteAdministrator extends React.Component {

    render() {
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div class="pure-g">
                    <h1>Delete administrator</h1>
                    <p>Are you sure you want to delete this administrator? Once you canceled it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <body>
                                {rows}
                            </body>
                            <button>Delete</button>
                            <button>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteAdministrator;