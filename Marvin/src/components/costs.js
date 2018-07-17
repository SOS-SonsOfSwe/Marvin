import React from 'react';
import LoadingData from './Loading/LoadingData';
import { getEurFromEth } from '../utils/costs'
import { round } from '../utils/costs'
// import LoadingData from '../../../Loading/LoadingData'
// import EmptyData from '../../../Loading/EmptyData'

const Row = ({ index, safeLow, standard, Operations, ethEur }) => (
  <tr className="clickable-row costs-table">
    <td>{Operations[index].name}</td>
    <td>{Operations[index].gCost}</td>
    <td>{Operations[index].ethCost1}</td>
    <td>{round(ethEur * Operations[index].ethCost1, 2)}</td>
    <td>{round(Operations[index].gCost * safeLow * 0.000000001, 5)}</td>
    <td>{round(ethEur * Operations[index].gCost * safeLow * 0.000000001, 2)}</td>
    <td>{round(Operations[index].gCost * standard * 0.000000001, 5)}</td>
    <td>{round(ethEur * Operations[index].gCost * standard * 0.000000001, 2)}</td>

  </tr>
);

var Operations = [
  { name: "Adding a new admin", gCost: 100000, ethCost1: 0.0001 },
  { name: "Adding a new teacher", gCost: 100000, ethCost1: 0.0001 },
  { name: "Adding a new student", gCost: 125000, ethCost1: 0.000125 },
  { name: "Adding a new academic year", gCost: 45000, ethCost1: 0.000045 },
  { name: "Adding a new degree", gCost: 110000, ethCost1: 0.00011 },
  { name: "Adding a new class", gCost: 150000, ethCost1: 0.00015 },
  { name: "Adding a new exam", gCost: 110000, ethCost1: 0.00011 },
  { name: "Deleting an academic year", gCost: 45000, ethCost1: 0.000045 },
  { name: "Deleting a degree", gCost: 65000, ethCost1: 0.000065 },
  { name: "Deleting a class", gCost: 60000, ethCost1: 0.000060 },
  { name: "Deleting an exam", gCost: 60000, ethCost1: 0.000060 },
  { name: "Deleting an user", gCost: 35000, ethCost1: 0.000035 },
  { name: "User signUp", gCost: 100000, ethCost1: 0.0001 },
  { name: "Setting a valuation", gCost: 65000, ethCost1: 0.000065 },
  { name: "Enrolling to an exam", gCost: 100000, ethCost1: 0.0001 },
  { name: "Accepting a valuation", gCost: 100000, ethCost1: 0.0001 },

];


class Costs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ethEur: ""
    }
  }


  componentDidMount() {
    this.props.getCostsJSON();
    getEurFromEth().then(result => this.setState({ ethEur: result }))
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
              <table className="costs-table">
                <thead>
                  <tr>
                    <th className="title-column"></th>
                    <th className="title-column"></th>
                    <th className="title-column" colSpan="2"> Low Cost Gas Price (1 Gwei)</th>
                    <th className="title-column" colSpan="2"> Safe-low Gas Price ({round(this.props.costsJSON[0].safeLow, 0)} Gwei)</th>
                    <th className="title-column" colSpan="2"> Average Gas Price ({round(this.props.costsJSON[0].standard, 0)} Gwei)</th>
                  </tr>
                  <tr>
                    <th className="title-column">Operation</th>
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
                  {this.props.costsJSON.map((rowData, index) => <Row key={index} {...rowData} index={index} Operations={Operations} ethEur={this.state.ethEur} />)}
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