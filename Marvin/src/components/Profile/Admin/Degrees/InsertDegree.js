import React from 'react';
import { Link } from 'react-router'
import { checkDegreeUnicode } from '../../../../utils/validations';

class InsertDegree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            description: '',
            degreeUnicode: ''
        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDegreeUnicodeChange = this.handleDegreeUnicodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit(event) {
        event.preventDefault()
        if(!checkDegreeUnicode(this.state.degreeUnicode))
            return alert("The degree unicode has an invalid format")
        event.preventDefault()
        this.props.addDegree(this.state.degreeUnicode, this.state.year, this.state.description)
    }

    render() {
        return (
            <main className='container' onSubmit={this.handleSubmit}>
                <div className="pure-u-1-1">
                    <h1>Insert degree</h1>
                    <p>Now you can insert a new degree.</p>
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
                                <button className="button_cancel">
                                    <Link to='/profile/degrees'>Cancel</Link>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertDegree;