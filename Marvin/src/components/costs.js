import React from 'react';
import { Link } from 'react-router'
import LoadingData from './Loading/LoadingData';
// import LoadingData from '../../../Loading/LoadingData'
// import EmptyData from '../../../Loading/EmptyData'

const Row = ({ key, safeLow, standard, fast, fastest, Operations }) => (
    <tr className="clickable-row">
        <td>{Operations[key].name}</td>
        <td>
            <Link to={{
                pathname: "/profile/degrees/insert-degree"
            }} > Insert degree</Link>
        </td>
        <td>
            <button className="delete-link">
                <Link to={{
                    pathname: "/profile/academic-years/delete-academic-year",
                }}><span className="X-button">X</span>Delete</Link>
            </button>
        </td>

    </tr>
);

var Operations = [
    { name: "Add a new admin", gCost: 100000, eurCost1: 0.0001 },
    { name: "Add a new teacher", gCost: 100000, eurCost1: 0.0001 },
    { name: "Add a new student", gCost: 125000, eurCost1: 0.000125 },
    { name: "Add a new academic year", gCost: 45000, eurCost1: 0.000045 },
    { name: "Add a new degree", gCost: 110000, eurCost1: 0.00011 },
    { name: "Add a new class", gCost: 150000, eurCost1: 0.00015 },
    { name: "Add a new exam", gCost: 110000, eurCost1: 0.00011 },
    { name: "Delete an academic year", gCost: 45000, eurCost1: 0.000045 },
    { name: "Delete a degree", gCost: 65000, eurCost1: 0.000065 },
    { name: "Delete a class", gCost: 60000, eurCost1: 0.000060 },
    { name: "Delete an exam", gCost: 0, eurCost1: 0 },
    { name: "Delete an user", gCost: 35000, eurCost1: 0.000035 },
    { name: "User signUp", gCost: 100000, eurCost1: 0.0001 },
    { name: "Set a valuation", gCost: 65000, eurCost1: 0.000065 },
    { name: "Enroll to an exam", gCost: 100000, eurCost1: 0.0001 },
    { name: "Accept a valuation", gCost: 100000, eurCost1: 0.0001 },

];


class Costs extends React.Component {

    componentDidMount() {
        this.props.getCostsJSON();
    }

    render() {
        const load = this.props.loading ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        // const empty = this.props.empty ? <EmptyData label='no data found on blockchain' /> : <div />

        return (
            <div>
                {load}
                {error}
                {/* {empty} */}
                {/* executing this field only if the loading is false. Pay attention to the exact value: avoid doing "something !== false", instead use "something===true" as "null" is a third value */}
                {this.props.loading !== true && this.props.success === true &&
                    <main className='container'>
                        <div className="pure-u-1-1">
                            <h1>Operations prices</h1>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="title-column"></th>
                                        <th className="title-column" colSpan="2"> Low Cost Gas Price </th>
                                        <th className="title-column" colSpan="2"> Safe-low Gas Price </th>
                                        <th className="title-column" colSpan="2"> Average Gas Price </th>
                                    </tr>
                                    <tr>
                                        <th className="title-column">Gas cost</th>
                                        <th className="title-column">Cost (ETH)</th>
                                        <th className="title-column">Cost (EUR)</th>
                                        <th className="title-column">Cost (ETH)</th>
                                        <th className="title-column">Cost (EUR)</th>
                                        <th className="title-column">Cost (ETH)</th>
                                        <th className="title-column">Cost (EUR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {console.log('this.props.data.load: ' + this.props.data)} */}
                                    {/* {console.log('component: AcademicYear. Data: this.props.data: ' + JSON.stringify(this.props.data))} */}
                                    {this.props.costsJSON.map((rowData, index) => <Row key={index} {...rowData} Operations={Operations} />)}}
                                </tbody>
                            </table>
                        </div>
                    </main>
                }
            </div>
        )


    }
}

export default Costs;