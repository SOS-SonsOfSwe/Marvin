import React from 'react';
import { Link } from 'react-router'

// var arrayData = [
//     { year: "2017-2018" },
//     { year: "2016-2017" },
//     { year: "2015-2016" },
//     { year: "2014-2015" },
//     { year: "2013-2014" },
// ]

const Row = ({ year }) => (
    <tr className="clickable-row">
        <td>Academic year {year}
            <div className="float-right">
                <button>
                    <Link to="/profile/academic-years/insert-degree-course">Insert degree course</Link>
                </button>
                <Link to="/profile/academic-years/modify-academic-year">Modify</Link>
                <Link to="/profile/academic-years/delete-academic-year">Delete</Link>
            </div>
        </td>
    </tr>
);

class AcademicYears extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            academicYearsData: 'componentState'
        }
        this.props.readAcademicData()

    }

    render() {
        var arrayData = Object.values(this.state.academicYearsData);
        const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <main className='container'>
                <h1>Academic years</h1>
                <p className="text-center">Here there is the list of the academic years.</p>
                <ul>
                    <button>
                        <Link to="/profile/academic-years/insert-academic-year" className="pure-menu-link"> Insert academic year </Link>
                    </button>
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