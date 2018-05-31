import React from 'react';
import { Link } from 'react-router'

var arrayData = [
    { year: "2017-2018" },
    { year: "2016-2017" },
    { year: "2015-2016" },
    { year: "2014-2015" },
    { year: "2013-2014" },
]

const Row = ({ year }) => (
    <tr className="clickable-row">
        <td>Academic year {year}
            <div className="float-right">
                <button href="#">Insert degree course</button> <a href="#">Modify</a> <a href="#">Delete</a>
            </div>
        </td>
    </tr>
);

class AcademicYears extends React.Component {
    render() {

        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <h1>Academic years</h1>
                <p className="text-center">Here there is the list of the academic years.</p>
                <ul>
                    <li className="pure-menu-item">
                        <Link to="/profile/academic-years/insert-academic-year" className="pure-menu-link"> Insert academic year </Link>
                    </li>
                </ul>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Year</th>
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

export default AcademicYears;