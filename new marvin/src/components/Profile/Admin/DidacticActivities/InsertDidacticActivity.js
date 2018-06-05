import React from 'react';
import { Link } from 'react-router'

class InsertDidacticActivity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: '',
            degreeCourse: '',
            didacticActivity: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

    handleChange1(event) {
        this.setState({ degreeCourse: event.target.value });
    }

    handleChange2(event) {
        this.setState({ didacticActivity: event.target.value });
    }

    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Insert didactic activity</h1>
                    <p>Now you can insert a new didactic activity.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} placeholder="Insert a year" />
                            <label>Degree Course</label>
                            <input type="text" value={this.state.degreeCourse} onChange={this.handleChange1} placeholder="Insert a degree course" />
                            <label>Didactic activity</label>
                            <input type="text" value={this.state.didacticActivity} onChange={this.handleChange2} placeholder="Insert a didactic activity" />
                            <br />
                            <Link to="/profile/didactic-activities/insert-exam">Insert an exam</Link>

                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <button>Cancel</button> {/*magari è un 'input' o 'a' invece che button che porta alla pagina precedente*/}
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertDidacticActivity;