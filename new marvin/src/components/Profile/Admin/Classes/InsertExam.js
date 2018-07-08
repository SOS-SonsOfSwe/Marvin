import React from 'react';
import { Link } from 'react-router'


class InsertExam extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Class: this.props.Class,
            type: '',
            teacher: '',
            place: '',
            date: '',
            time: '',
            unicode: ''
        }

        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.handleChange7 = this.handleChange7.bind(this);
        this.handleChange8 = this.handleChange8.bind(this);
        this.handleChange9 = this.handleChange9.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }


    handleChange2(event) {
        this.setState({ Class: event.target.value });
    }

    handleChange3(event) {
        this.setState({ type: event.target.value });
    }

    handleChange4(event) {
        this.setState({ teacher: event.target.value });
    }

    handleChange5(event) {
        this.setState({ place: event.target.value });
    }

    handleChange6(event) {
        this.setState({ date: event.target.value });
    }

    handleChange7(event) {
        this.setState({ time: event.target.value });
    }

    handleChange9(event) {
        this.setState({ unicode: event.target.value });
    }

    handleSave(event) {

        event.preventDefault();

        let examData = {
            "type": this.state.type,
            "place": this.state.place,
            "date": this.state.date,
            "time": this.state.time
        }

        this.props.addExam(this.state.teacher, this.state.Class, this.state.unicode, examData);
    }

    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Insert an exam</h1>
                    <p>Now you can insert a new exam.</p>
                    <form className="pure-form pure-form-stacked" onSubmit={this.handleSave}>
                        <fieldset>
                            <label>Class</label>
                            <input type="text" value={this.state.Class} onChange={this.handleChange2} placeholder="Insert a class" />
                            <label>Exam type</label>
                            <input type="text" value={this.state.type} onChange={this.handleChange3} placeholder="Insert the exam type" />
                            <label>Teacher</label>
                            <input type="text" value={this.state.teacher} onChange={this.handleChange4} placeholder="Insert teacher unicode" />
                            <label>Place</label>
                            <input type="text" value={this.state.place} onChange={this.handleChange5} placeholder="Insert a place" />
                            <label>Date</label>
                            <input type="text" value={this.state.date} onChange={this.handleChange6} placeholder="Insert a date" />
                            <label>Time</label>
                            <input type="text" value={this.state.time} onChange={this.handleChange7} placeholder="Insert a time" />
                            <label>Unicode</label>
                            <input type="text" value={this.state.unicode} onChange={this.handleChange9} placeholder="Insert a unicode" />
                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <button className="button_cancel">
                                    <Link to='/profile/classes'>Cancel</Link>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertExam;