import React from 'react';
import LoadingData from '../../Loading/LoadingData'
import EmptyData from '../../Loading/EmptyData'

const Row = ({ classUnicode, classData, mark }) => (
    <tr className="clickable-row">
        <td>{classUnicode}</td>
        <td>{classData}</td>
        <td>{mark}</td>
    </tr>
)

class SchoolRecords extends React.Component {
    componentDidMount() {
        // so we do not re load the page if the user has just deleted an academic year.
        // null is the value of the initial state and it is different from false.
        // if (this.props.justDeleted !== true)
        this.props.readBooklet()
    }


    render() {
        const load = this.props.loading === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.empty ? <EmptyData label='no data found on blockchain' /> : <div />
        //const rows = arrayData.map((rowData, index) => <Row key={index} {...rowData} />);
        // console.error('Payload: ' + JSON.stringify(this.props.exams))
        // console.error('success: ' + this.props.success)

        return (
            <div>
                {load}
                {/* {ipfsLoad} */}
                {empty}
                <main className='container'>
                    {this.props.empty === false && this.props.success === true && this.props.loading !== true &&
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="title-column">Class unicode</th>
                                    <th className="title-column">Description</th>
                                    <th className="title-column">Mark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.exams.map((rowData, index) => <Row key={index} {...rowData} badgeNumber={this.props.badgeNumber} hConf={this.handleConf} />)}
                            </tbody>
                        </table>
                    }


                </main>
                {error}
            </div >
        )
    }
}

export default SchoolRecords;