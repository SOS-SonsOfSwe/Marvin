import React from 'react';

class ModifyDidacticActivity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: '2000credici',  /*INSERIRE L'ANNO ACCADEMICO*/
            degreeCourse: 'to mare',  /*INSERIRE IL CORSO DI LAUREA*/
            didacticActivity: 'omo',  /*INSERIRE L'ATTIVITà DIDATTICA CHE L'UTENTE HA DECISO DI MODIFICARE*/
            typology: 'tipologia',  /*INSERIRE LA TIPOLOGIA DELL'ESAME CHE L'UTENTE HA DECISO DI MODIFICARE*/
            professor: 'professore',  /*INSERIRE IL PROFESSORE DELL'ESAME CHE L'UTENTE HA DECISO DI MODIFICARE*/
            place: 'luogo',  /*INSERIRE IL LUOGO DELL'ESAME CHE L'UTENTE HA DECISO DI MODIFICARE*/
            date: 'data',  /*INSERIRE LA DATA DELL'ESAME CHE L'UTENTE HA DECISO DI MODIFICARE*/
            time: 'ora'  /*INSERIRE L'ORA DELL'ESAME CHE L'UTENTE HA DECISO DI MODIFICARE*/

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.handleChange7 = this.handleChange7.bind(this);
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

    handleChange3(event) {
        this.setState({ typology: event.target.value });
    }

    handleChange4(event) {
        this.setState({ professor: event.target.value });
    }

    handleChange5(event) {
        this.setState({ place: event.target.value });
    }

    handleChange6(event) {
        this.setState({ date: event.target.value });
    }

    handleChange7(event) {
        this.setState({ time: event.target.value });
    }

    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Modify didactic activity</h1>
                    <p>Now you can modify this didactic activity.</p>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange} />
                            <label>Degree course</label>
                            <input type="text" value={this.state.degreeCourse} onChange={this.handleChange1} />
                            <label>Didactic activity</label>
                            <input type="text" value={this.state.didacticActivity} onChange={this.handleChange2} />
                            <label>Exam</label>
                            <div className="float-right">
                                <label>Tipology</label>
                                <input type="text" value={this.state.typology} onChange={this.handleChange3} />
                                <label>Professor</label>
                                <input type="text" value={this.state.professor} onChange={this.handleChange4} />
                                <label>Place</label>
                                <input type="text" value={this.state.place} onChange={this.handleChange5} />
                                <label>Date</label>
                                <input type="text" value={this.state.date} onChange={this.handleChange6} />
                                <label>Time</label>
                                <input type="text" value={this.state.time} onChange={this.handleChange7} />
                            </div>
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

export default ModifyDidacticActivity;