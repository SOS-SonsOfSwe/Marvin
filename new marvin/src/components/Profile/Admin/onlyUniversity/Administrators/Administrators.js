import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../../Loading/LoadingData'
import LoadingIPFSData from '../../../../Loading/LoadingIpfs'
import EmptyData from '../../../../Loading/EmptyData'

/*var arrayData = [
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
    { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" },
]*/

const Row = ({ load, badgeNumber, fiscalCode, isSignedUp }) => (
    <tr className="clickable-row">
        <td>{load && load.name}</td>
        <td>{load && load.surname}</td>
        <td>{badgeNumber}</td>
        <td>{fiscalCode}</td>
        <td>{isSignedUp}</td>
        <td>
            <button className="delete-link">
                <Link to="/profile/administrators/delete-administrator">Delete</Link>
            </button>
        </td>
    </tr>
);

class Administrators extends React.Component {
    componentDidMount() {
        this.props.readAdmins('admin');
    }

    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const empty = this.props.empty ? <EmptyData label='no data found on blockchain' /> : <div />
        //const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <div>
                {console.log('this.props.loading: ' + this.props.loading)}
                {console.log('this.props.empty: ' + this.props.empty)}
                {load}
                {ipfsLoad}
                {empty}
                {(this.props.loading === false && this.props.ipfsLoading !== true) &&
                    <main className='container'>
                        <div className="pure-u-1-1">
                            <h1>Administrators</h1>
                            <p className="text-center">Here there is the list of the administrators.</p>
                            <div className="div_insert_button">
                                <button className="insert-button pure-button pure-button-primary">
                                    <Link className="pure-link" to={{
                                        pathname: '/insert-user',
                                        state: { type: 1 }
                                    }}
                                    >Insert an administrator</Link>
                                </button>
                            </div>
                            {this.props.empty === false && this.props.success === true &&
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="title-column">Name</th>
                                            <th className="title-column">Surname</th>
                                            <th className="title-column">Badge number</th>
                                            <th className="title-column">Fiscal code</th>
                                            <th className="title-column">Is signed up</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.administrators.map((rowData, index) => <Row key={index} {...rowData} />)}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </main>
                }
                {error}
            </div>
        )
    }
}

export default Administrators;