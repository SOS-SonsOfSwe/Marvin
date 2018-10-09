import React from 'react';
import { Link } from 'react-router'
import LoadingData from '../../../../Loading/LoadingData'
import EmptyData from '../../../../Loading/EmptyData'


const Row = ({ load, FC, badgeNumber, isSignedUp }) => (
    <tr className="clickable-row">
        <td>{load && load.name}</td>
        <td>{load && load.surname}</td>
        <td>{badgeNumber}</td>
        <td>{FC}</td>
        <td>
            <button className="point-button" style={isSignedUp === false ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}></button>
        </td>
        <td>
            {isSignedUp !== true ?
                <Link to={{
                    pathname: "/profile/administrators/delete-administrator",
                    state: {
                        badgeNumber: badgeNumber,
                        FC: FC
                    }
                }}>
                    <button className="delete-link">
                        <span className="X-button">X</span>Delete
                </button>
                </Link>
                : ""}
        </td>
    </tr>
);

class Administrators extends React.Component {
    componentDidMount() {
        this.props.readAdmins('admin');
    }

    render() {
        const load = this.props.loading === true || this.props.ipfsLoading ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.empty ? <EmptyData label='no data found on blockchain' /> : <div />
        //const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);

        return (
            <div>
                {/* {// console.log('this.props.loading: ' + this.props.loading)} */}
                {/* {// console.log('this.props.empty: ' + this.props.empty)} */}
                {load}
                {empty}
                {(this.props.loading === false && this.props.ipfsLoading !== true) &&
                    <main className='container'>
                        <div className="pure-u-1-1">
                            <h1>Administrators</h1>
                            <p className="text-center">List of the administrators.</p>
                            <div className="div_insert_button">
                                <Link className="pure-link" to={{
                                    pathname: '/insert-user',
                                    state: { type: 1 }
                                }}
                                >
                                    <button className="insert-button pure-button pure-button-primary">
                                        Insert an administrator
                                </button>
                                </Link>
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