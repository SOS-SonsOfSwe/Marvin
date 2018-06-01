import React from 'react';

var arrayData = [
    {
        year: "2018", degreeCourse: "informatica", didacticActivity: "probabilità", exam1: "primo appello",
        exam2: "secondo appello", exam3: "terzo appello"
    },
]

const Row = ({ year, degreeCourse, didacticActivity, exam1, exam2, exam3 }) => (
    <div>
        <p>Academic year: {year}</p>
        <p>Degree course: {degreeCourse}</p>
        <p>Didactic activity: {didacticActivity}</p>
        <p>Exam 1: {exam1}</p>
        <p>Exam 2: {exam2}</p>
        <p>Exam 3: {exam3}</p>
    </div>
);

class DeleteDidacticActivity extends React.Component {

    render() {
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete didactic activity</h1>
                    <p>Are you sure you want to delete this didactic activity? Once you canceled it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            {rows}
                            <button>Delete</button>
                            <button>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteDidacticActivity;