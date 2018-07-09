import React from 'react';
import { Link } from 'react-router'

class InsertAcademicYear extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

    handleSave(event) {
        event.preventDefault()
        this.props.addAcademicYear(this.state.year)
    }

    render() {
        return (
            <main className='container' onSubmit={this.handleSave}>
                <div className="pure-u-1-1">
                    <h1>Insert academic year</h1>
                    <p>Now you can insert a new academic year.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} placeholder="Insert a new year" />
                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <button className="button_cancel">
                                <Link to='/profile/academic-years'>Cancel</Link>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertAcademicYear;