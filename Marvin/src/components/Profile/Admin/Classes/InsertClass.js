import React from 'react';
import { Link } from 'react-router'
import { checkDegreeUnicode } from '../../../../utils/validations';


const OptionsT = ({ badgeNumber }) => (
    <option value={badgeNumber}> {badgeNumber} </option>
);

class InsertClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // year: this.props.year,
            degree: this.props.degreeUnicode,
            class: '',
            description: '',
            teacher: ''
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //     this.setState({ year: event.target.value });
    // }

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


    componentDidMount() {
        this.props.readTeachers()
    }
    render() {
        return (
            <main className='container' onSubmit={this.handleSubmit}> 
                <div className="pure-u-1-1">
                    <h1>Insert Class</h1>
                    <p>Now you can insert a new Class.</p>
                    <form className="pure-form pure-form-stacked" >
                        <fieldset>
                            {/* <label htmlFor="years"> Select academic year </label>
                            <select type="text" name="years" value={this.state.year} onChange={this.handleChange}>
                                {<option value="select year" disabled={this.state.years === "" ? false : true}> -- select a year -- </option>}
                                {this.props.emptyAcademicYears === false &&
                                    this.props.academicYears.map((rowData, index) => <OptionsY key={index} {...rowData} />)}
                            </select> */}
                            <label>Degree</label>
                            <input type="text" value={this.state.degree} readOnly="true" />
                            <label>Class</label>
                            <input type="text" value={this.state.class} onChange={this.handleChange2} placeholder="Insert a Class" />
                            <label>Description</label>
                            <input type="text" value={this.state.description} onChange={this.handleChange3} placeholder="Insert a description" />
                            <label> Teacher badge </label>
                            {console.log("empty: " + this.props.empty)}
                            <select type="text" name="teacher" value={this.state.teacher} onChange={this.handleChange4}>
                                {<option value="select teacher" disabled={this.state.teacher === "" ? false : true}> -- select a teacher -- </option>}
                                {this.props.empty === false && this.props.success === true &&
                                    this.props.teachers.map((rowData, index) => <OptionsT key={index} {...rowData} />)}
                            </select>
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