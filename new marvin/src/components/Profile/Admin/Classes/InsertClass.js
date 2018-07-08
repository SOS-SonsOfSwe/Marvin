import React from 'react';
import { Link } from 'react-router'

class InsertClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            degree: this.props.degreeUnicode,
            class: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSave = this.handleSave.bind(this);
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

    handleSave(event) {
        event.preventDefault()
        this.props.addClass(this.state.year, this.state.degree, this.state.class, this.state.description)
    }

    /*componentDidMount() {

        if (this.props.fromDegree) {
            this.state = {
                year: this.props.year,
                degree: this.props.degreeUnicode,
                class: '',
            };
        }
    }*/

    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Insert Class</h1>
                    <p>Now you can insert a new Class.</p>
                    <form className="pure-form pure-form-stacked" onSubmit={this.handleSave}>
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} placeholder="Insert a year" />
                            <label>Degree</label>
                            <input type="text" value={this.state.degree} onChange={this.handleChange1} placeholder="Insert a degree" />
                            <label>Class</label>
                            <input type="text" value={this.state.class} onChange={this.handleChange2} placeholder="Insert a Class" />
                            <label>Description</label>
                            <input type="text" value={this.state.description} onChange={this.handleChange3} placeholder="Insert a description" />
                            <br />
                            <Link to="/profile/exams/insert-exam">Insert an exam</Link>
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