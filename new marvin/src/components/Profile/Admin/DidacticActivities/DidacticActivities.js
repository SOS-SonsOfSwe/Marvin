import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../Loading/LoadingData'


// var arrayData = [
//     { year: "2017-2018", degreeCourse: "Informatica", didacticActivity: "Probabilità" },
//     { year: "2017-2018", degreeCourse: "Matematica", didacticActivity: "Calcolo" },
//     { year: "2017-2018", degreeCourse: "Psicologia", didacticActivity: "Comportamento" },
//     { year: "2017-2018", degreeCourse: "Ingegneria", didacticActivity: "Analisi" },
//     { year: "2017-2018", degreeCourse: "Giurisprudenza", didacticActivity: "Diritto" },
//     { year: "2016-2017", degreeCourse: "Informatica", didacticActivity: "Probabilità" },
//     { year: "2016-2017", degreeCourse: "Matematica", didacticActivity: "Calcolo" },
//     { year: "2016-2017", degreeCourse: "Psicologia", didacticActivity: "Comportamento" },
// ]

const Row = ({ year, degreeCourse, didacticActivity }) => (
    <tr className="clickable-row">
        <td>Academic year {year}</td>
        <td>{degreeCourse}</td>
        <td>{didacticActivity}</td>
        <td>
            <Link to="/profile/didactic-activities/insert-exam">Insert an exam</Link>
        </td>
        <td>
            <button className="modify-link">
                <Link to="/profile/didactic-activities/modify-didactic-activity">Modify</Link>
            </button>
            <button className="delete-link">
                <Link to="/profile/didactic-activities/delete-didactic-activity">Delete</Link>
            </button>
        </td>
    </tr>
);

class DidacticActivities extends React.Component {
    constructor(props) {
        super(props)

        this.onSelectChangeY = this.onSelectChangeY.bind(this);
        this.onSelectChangeDC = this.onSelectChangeDC.bind(this);

        this.state = {
            selectedYears: '2017-2018',
            selectedDegreeCourse: 'Informatica'
        }
    }

    onSelectChangeY(event) {
        this.setState({ selectedYears: event.target.value },
            () => this.props.readDidacticActivitiesData(this.state.selectedYears, this.state.selectedDegreeCourse))
    }

    onSelectChangeDC(event) {
        this.setState({ selectedDegreeCourse: event.target.value },
            () => this.props.readDidacticActivitiesData(this.state.selectedYears, this.state.selectedDegreeCourse))
    }

    componentDidMount() {
        this.props.readDidacticActivitiesData(this.state.selectedYears, this.state.selectedDegreeCourse)

    }


    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;

        return (
            <div>
                {load}
                {this.props.loading === false &&
                    <div>
                        <main className='container'>
                            <div className="pure-u-1-1">
                                <h1>Didactic activities</h1>
                                <p className="text-center">Here there is the list of the didactic activities.</p>
                                <form className="pure-form-stacked pure-form">
                                    <fieldset>
                                        <label htmlFor="years"> Select academic year </label>
                                        <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChangeY}>
                                            <option value="2017-2018"> 2017-2018 </option>
                                            <option value="2016-2017"> 2016-2017 </option>
                                        </select>
                                        <label htmlFor="degreecourse"> Select degree course </label>
                                        <select type="text" name="degreecourse" value={this.state.selectedDegreeCourse} onChange={this.onSelectChangeDC}>
                                            <option value="Informatica"> Informatica </option>
                                            <option value="Fisica"> Fisica </option>
                                        </select>
                                    </fieldset>
                                </form>
                                <button className="insert-button pure-button pure-button-primary">
                                    <Link to="/profile/didactic-activities/insert-didactic-activity"> Insert didactic activity </Link>
                                </button>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="title-column">Year</th>
                                            <th className="title-column">Degree course</th>
                                            <th className="title-column">Didactic activity</th>
                                            <th className="title-column">Exam</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.data.map((rowData, index) => <Row key={index} {...rowData} />)}
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </div>
                }
                {error}
            </div>
        )
    }
}

export default DidacticActivities;