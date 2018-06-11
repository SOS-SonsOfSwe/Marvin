import React from 'react';
import { Link } from 'react-router'

class InsertDegreeCourse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: '',
            description: '',
            degreeUnicode: ''
        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDegreeUnicodeChange = this.handleDegreeUnicodeChange.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    handleYearChange(event) {
        this.setState({ year: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    handleDegreeUnicodeChange(event) {
        this.setState({ degreeUnicode: event.target.value });
    }

    handleSave(event) {
        event.preventDefault()
        this.props.addDegreeCourse(this.state.degreeUnicode, this.state.year, this.state.description)
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
                            <input type="text" value={this.state.year} onChange={this.handleYearChange} placeholder="Insert a year" />
                            <label>Degree description</label>
                            <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Insert the description" />
                            <label>Degree unicode</label>
                            <input type="text" value={this.state.degreeUnicode} onChange={this.handleDegreeUnicodeChange} placeholder="Insert the degree unicode" />
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