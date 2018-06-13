import React from 'react';

class ModifyDegreeCourse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: '2000credici',  /*INSERIRE L'ANNO ACCADEMICO*/
            degreeCourse: ''  /*INSERIRE IL CORSO DI LAUREA CHE L'UTENTE HA DECISO DI MODIFICARE*/
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

    handleChange1(event) {
        this.setState({ degreeCourse: event.target.value });
    }

    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Modify degree course</h1>
                    <p>Now you can modify this degree course.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} />
                            <label>Degree course</label>
                            <input type="text" value={this.state.degreeCourse} onChange={this.handleChange1} />
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

export default ModifyDegreeCourse;