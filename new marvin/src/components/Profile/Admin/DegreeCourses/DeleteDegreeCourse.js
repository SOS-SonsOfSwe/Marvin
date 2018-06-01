import React from 'react';

var arrayData = [
    { year: "2018", degreeCourse: "informatica" },
]

const Row = ({ year, degreeCourse }) => (
    <div>
        <p>Academic year: {year}</p>
        <p>Degree course: {degreeCourse}</p>
    </div>
);

class DeleteDegreeCourse extends React.Component {

    render() {
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <div class="pure-g">
                    <h1>Delete degree course</h1>
                    <p>Are you sure you want to delete this degree course? Once you canceled it, you can't go back.</p>
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

export default DeleteDegreeCourse;