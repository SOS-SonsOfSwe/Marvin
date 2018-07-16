import React from 'react';
import LoadingData from '../../Loading/LoadingData';
import EmptyData from '../../Loading/EmptyData';
import {markWrongPopup} from '../../../utils/popup'
import Popup from 'react-popup'

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
        let flag = false;
        this.state.votes.forEach(element => {
            if(element.vote < 0 || element.vote > 31)
                flag = true;
        })
        if(flag === true) {
            Popup.queue(markWrongPopup)
            Popup.clearQueue()
        }
        event.preventDefault();
        this.props.setMarksData(this.props.examUnicode, this.props.classUnicode, this.state.votes)
    }

    componentDidMount() {
        this.props.readStudentsData(this.props.examUnicode)


    }

    render() {
        const load = this.props.loadingStudents === true || this.props.ipfsLoading ? <LoadingData label='Loading...' /> : <div />;
        const error = this.props.success === false ? <div>There was an error...</div> : <div />;
        const empty = this.props.emptyStudents ? <EmptyData label='no data found on blockchain' /> : <div />


        return (
            <div>
                {load}
                {empty}
                {(this.props.loadingStudents === false && this.props.ipfsLoading !== true) &&
                    <main className='container'>
                    <Popup
                        className="mm-popup"
                        btnClass="mm-popup__btn"
                        closeBtn={false}
                        closeHtml={null}
                        defaultOk="Ok"
                        defaultCancel="Cancel"
                        wildClasses={false}
                        escToClose={true}
                    />
                        <h1 className="prof-list">Students registered to the exam with code: {this.props.examUnicode}</h1>
                        <p className="text-center prof-list">Here there is the list of the students that are registered to the X exam.</p>
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