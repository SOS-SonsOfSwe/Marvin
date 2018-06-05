import React from 'react';
import { Link } from 'react-router'

class InsertDegreeCourse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: '',
            degreeCourse: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

    handleChange1(event) {
        this.setState({ degreeCourse: event.target.value });
    }

    handleSave(event) {
        event.preventDefault()
        this.props.addDegreeCourse(this.state.degreeCourse, this.state.year)
    }

    render() {
        return (
            <main className='container' onSubmit={this.handleSave}>
                <div className="pure-u-1-1">
                    <h1>Insert degree course</h1>
                    <p>Now you can insert a new degree course.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} placeholder="Insert a year" />
                            <label>Degree Course</label>
                            <input type="text" value={this.state.degreeCourse} onChange={this.handleChange1} placeholder="Insert a degree course" />
                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <Link to='/profile/degree-courses'>Cancel</Link>
                                {/* magari è un 'input' o 'a' invece che button che porta alla pagina precedente */}
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertDegreeCourse;