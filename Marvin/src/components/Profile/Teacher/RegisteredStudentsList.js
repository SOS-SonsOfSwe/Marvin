import React from 'react';
import LoadingData from '../../Loading/LoadingData';
import LoadingIPFSData from '../../Loading/LoadingIpfs';
import EmptyData from '../../Loading/EmptyData';


const Row = ({ badgeNumber, hChange }) => (
    <tr className="clickable-row">
        <td> {badgeNumber} </td>
        <td>
            <fieldset><input type="text" onChange={(e) => hChange(badgeNumber, e)} />
            </fieldset>
        </td>
    </tr >
);

class RegisteredStudentsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            votes: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(badgeNumber, event) {

        let flag = false;

        this.state.votes.forEach(element => {
            if (element.badgeNumber === badgeNumber && flag === false) {
                element.vote = event.target.value;
                flag = true;
            }
        });

        if (flag === false) this.setState({ votes: this.state.votes.concat([{ badgeNumber: badgeNumber, vote: event.target.value }]) });
    }

    handleSave(event) {
        event.preventDefault();
        this.props.setMarksData(this.props.examUnicode, this.props.classUnicode, this.state.votes)
    }

    componentDidMount() {
        this.props.readStudentsData(this.props.examUnicode)


    }

    render() {
        const load = this.props.loadingStudents === true ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const ipfsLoad = this.props.ipfsLoading ? <LoadingIPFSData label='IPFS is loading...' /> : <div />;
        const empty = this.props.emptyStudents ? <EmptyData label='no data found on blockchain' /> : <div />


        return (
            <div>
                {load}
                {ipfsLoad}
                {empty}
                {(this.props.loadingStudents === false && this.props.ipfsLoading !== true) &&
                    <main className='container'>
                        <h1>Students registered to the exam with code: {this.props.examUnicode}</h1>
                        <p className="text-center">Here there is the list of the students that are registered to the X exam.</p>
                        {this.props.emptyStudents === false && this.props.success === true &&
                            <div>
                                <span className="float-right" href="#">Total registered students: {this.props.students.length}</span>
                                <form onSubmit={this.handleSave}>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Badge number</th>
                                                <th>Vote</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.students.map((rowData, index) => <Row key={index} {...rowData} hChange={this.handleChange} />)}
                                        </tbody>
                                    </table>
                                    <fieldset>
                                        <input type="submit" value="Save" />
                                    </fieldset>
                                </form>
                            </div>
                        }
                    </main>
                }
                {error}
            </div>
        )
    }

}

export default RegisteredStudentsList;