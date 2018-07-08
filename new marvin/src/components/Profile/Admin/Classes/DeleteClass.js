import React from 'react';

var arrayData = [
    {
        year: "2018", degree: "informatica", class: "probabilità", exam1: "primo appello",
        exam2: "secondo appello", exam3: "terzo appello"
    },
]

const Row = ({ year, degree, Sclass, exam1, exam2, exam3 }) => (
    <div>
        <p>Academic year: {year}</p>
        <p>Degree: {degree}</p>
        <p>Class: {Sclass}</p>
        <p>Exam 1: {exam1}</p>
        <p>Exam 2: {exam2}</p>
        <p>Exam 3: {exam3}</p>
    </div>
);

class DeleteClass extends React.Component {

    render() {
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete Class</h1>
                    <p>Are you sure you want to delete this Class? Once you delete it, you can't go back.</p>
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

export default DeleteClass;