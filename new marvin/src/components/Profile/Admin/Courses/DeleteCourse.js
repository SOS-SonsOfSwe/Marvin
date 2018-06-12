import React from 'react';

var arrayData = [
    {
        year: "2018", degreeCourse: "informatica", course: "probabilità", exam1: "primo appello",
        exam2: "secondo appello", exam3: "terzo appello"
    },
]

const Row = ({ year, degreeCourse, course, exam1, exam2, exam3 }) => (
    <div>
        <p>Academic year: {year}</p>
        <p>Degree course: {degreeCourse}</p>
        <p>Course: {course}</p>
        <p>Exam 1: {exam1}</p>
        <p>Exam 2: {exam2}</p>
        <p>Exam 3: {exam3}</p>
    </div>
);

class DeleteCourse extends React.Component {

    render() {
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete Course</h1>
                    <p>Are you sure you want to delete this Course? Once you canceled it, you can't go back.</p>
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

export default DeleteCourse;