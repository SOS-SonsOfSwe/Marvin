import React from 'react';
import { Link } from 'react-router'
import { checkDegreeUnicode } from '../../../../utils/validations';


const OptionsDC = ({ degreeUnicode }) => (
    <option value={degreeUnicode}> {degreeUnicode} </option>
);

const OptionsY = ({ year }) => (
    <option value={year}> {year} </option>
);

class InsertClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            degree: this.props.degreeUnicode,
            class: '',
            description: '',
            teacher: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

    handleChange1(event) {
        this.setState({ degree: event.target.value });
    }

    handleChange2(event) {
        this.setState({ class: event.target.value });
    }

    handleChange3(event) {
        this.setState({ description: event.target.value });
    }

    handleChange4(event) {
        this.setState({ teacher: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault()
        if(!checkDegreeUnicode(this.state.class))
            return alert("The class code has an invalid format")
        event.preventDefault()
        this.props.addClass(this.state.degree, this.state.class, this.state.description, this.state.teacher)
    }

    render() {
        return (
            <main className='container' onSubmit={this.handleSubmit}>
                <div className="pure-u-1-1">
                    <h1>Insert Class</h1>
                    <p>Now you can insert a new Class.</p>
                    <form className="pure-form pure-form-stacked" >
                        <fieldset>
                            <label htmlFor="years"> Select academic year </label>
                            <select type="text" name="years" value={this.state.year} onChange={this.handleChange}>
                                {<option value="select year" disabled={this.state.years === "" ? false : true}> -- select a year -- </option>}
                                {this.props.emptyAcademicYears === false &&
                                    this.props.academicYears.map((rowData, index) => <OptionsY key={index} {...rowData} />)}
                            </select>
                            <label htmlFor="degree"> Select degree </label>
                            <select type="text" name="degree" value={this.state.degree} onChange={this.handleChange1}>
                                {<option value="select degree" disabled={this.state.degree === "" ? false : true}> -- select a degree -- </option>}
                                {console.log('this.props.degrees: ' + JSON.stringify(this.props.degrees))}
                                {this.props.emptyDegrees === false && this.props.successDegree === true &&
                                    this.props.degrees.map((rowData, index) => <OptionsDC key={index} {...rowData} />)}
                            </select>
                            <label>Class</label>
                            <input type="text" value={this.state.class} onChange={this.handleChange2} placeholder="Insert a Class" />
                            <label>Description</label>
                            <input type="text" value={this.state.description} onChange={this.handleChange3} placeholder="Insert a description" />
                            <label>Teacher</label>
                            <input type="text" value={this.state.teacher} onChange={this.handleChange4} placeholder="Insert a teacher" />
                            <br />
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

export default InsertClass;