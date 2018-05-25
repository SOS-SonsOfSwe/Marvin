import React from 'react';

var arrayData = [
    {year: "2018", degreeCourse: "informatica", didacticActivity: "probabilità"},
]

const Row = ({year, degreeCourse, didacticActivity}) => (
    <div>
        <label>Academic year</label>
        <p>{year}</p>
        <label>Degree course</label>
        <p>{degreeCourse}</p>
        <label>Didactic activity</label>
        <p>{didacticActivity}</p>
    </div>
);

class InsertExam extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = { 
            typology: '', 
            professor: '',  
            place: '', 
            date: '',  
            time: '' 
        };
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.handleChange7 = this.handleChange7.bind(this);
    }

    handleChange3(event) {
        this.setState({typology: event.target.value});
    }

    handleChange4(event) {
        this.setState({professor: event.target.value});
    }

    handleChange5(event) {
        this.setState({place: event.target.value});
    }

    handleChange6(event) {
        this.setState({date: event.target.value});
    }

    handleChange7(event) {
        this.setState({time: event.target.value});
    }

    render(){
        const rows = arrayData.map( (rowData) => <Row {...rowData} />);

        return(
            <main className='container'>
                <div class="pure-g">
                    <h1>Insert an exam</h1>
                    <p>Now you can insert a new exam.</p>
                        <form className="pure-form pure-form-stacked">
                            <fieldset>
                                <body>
                                    {rows}
                                </body>
                                <label>Tipology</label>
                                <input type="text" value={this.state.typology} onChange={this.handleChange3} placeholder="Insert a tipology"/>
                                <label>Professor</label>
                                <input type="text" value={this.state.professor} onChange={this.handleChange4} placeholder="Insert a professor"/>
                                <label>Place</label>
                                <input type="text" value={this.state.place} onChange={this.handleChange5} placeholder="Insert a place"/>
                                <label>Date</label>
                                <input type="text" value={this.state.date} onChange={this.handleChange6} placeholder="Insert a date"/>
                                <label>Time</label>
                                <input type="text" value={this.state.time} onChange={this.handleChange7} placeholder="Insert a time"/>
                                
                                <input type="submit" value="Save" />
                                <button>Cancel</button> {/*magari è un 'input' o 'a' invece che button che porta alla pagina precedente*/}
                            </fieldset>
                        </form>
                </div>
            </main>    
        )
    }    
}

export default InsertExam;