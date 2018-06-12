import React from 'react';
import { Link } from 'react-router'

class InsertCourse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            degreeCourse: this.props.degreeUnicode,
            course: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
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

    handleSave(event) {
        event.preventDefault()
        this.props.addCourse(this.state.year, this.state.degreeCourse, this.state.course)
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
                            <br />
                            <Link to="/profile/courses/insert-exam">Insert an exam</Link>

                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <Link to='/profile/courses'>Cancel</Link>
                                {/* magari è un 'input' o 'a' invece che button che porta alla pagina precedente */}
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertCourse;