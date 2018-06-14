import React from 'react';
import { Link } from 'react-router'

class InsertCourse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            degreeCourse: this.props.degreeUnicode,
            course: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

    handleChange1(event) {
        this.setState({ degreeCourse: event.target.value });
    }

    handleChange2(event) {
        this.setState({ course: event.target.value });
    }

    handleChange3(event) {
        this.setState({ description: event.target.value });
    }

    handleSave(event) {
        event.preventDefault()
        this.props.addCourse(this.state.year, this.state.degreeCourse, this.state.course, this.state.description)
    }

    /*componentDidMount() {

        if (this.props.fromDegree) {
            this.state = {
                year: this.props.year,
                degreeCourse: this.props.degreeUnicode,
                course: '',
            };
        }
    }*/

    render() {
        return (
            <main className='container' onSubmit={this.handleSave}>
                <div className="pure-u-1-1">
                    <h1>Insert Course</h1>
                    <p>Now you can insert a new Course.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} placeholder="Insert a year" />
                            <label>Degree Course</label>
                            <input type="text" value={this.state.degreeCourse} onChange={this.handleChange1} placeholder="Insert a degree course" />
                            <label>Course</label>
                            <input type="text" value={this.state.course} onChange={this.handleChange2} placeholder="Insert a Course" />
                            <label>Description</label>
                            <input type="text" value={this.state.description} onChange={this.handleChange3} placeholder="Insert a description" />
                            <br />
                            <Link to="/profile/courses/insert-exam">Insert an exam</Link>
                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <button className="button_cancel">
                                    <Link to='/profile/courses'>Cancel</Link>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertCourse;