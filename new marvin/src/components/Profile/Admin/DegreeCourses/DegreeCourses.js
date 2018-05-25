import React from 'react';

var arrayData = [
    {year: "2017-2018", degreeCourse: "Informatica"},
    {year: "2017-2018", degreeCourse: "Matematica"},
    {year: "2017-2018", degreeCourse: "Psicologia"},
    {year: "2017-2018", degreeCourse: "Ingegneria"},
    {year: "2017-2018", degreeCourse: "Giurisprudenza"},
    {year: "2016-2017", degreeCourse: "Informatica"},
    {year: "2016-2017", degreeCourse: "Matematica"},
    {year: "2016-2017", degreeCourse: "Psicologia"},
]

const Row = ({year, degreeCourse}) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>Degree course{degreeCourse}
        <div className="float-right">
        <button href="#">Insert didactic activity</button> <a href="#">Modify</a> <a href="#">Delete</a>
        </div>
        </td>
    </tr>
);

class DegreeCourses extends React.Component{
    render(){

        const rows = arrayData.map( (rowData) => <Row {...rowData} />);

        return(
            <main className='container'>
                <h1>Degree courses</h1>
                <p className="text-center">Here there is the list of the degree courses.</p>
                <button className="float-right" href="#">Insert degree course</button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Degree course</th>
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

export default DegreeCourses;