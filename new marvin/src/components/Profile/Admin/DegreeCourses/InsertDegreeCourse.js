import React from 'react';

class InsertDegreeCourse extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            year: '',
            degreeCourse: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
    }

    handleChange(event) {
        this.setState({year: event.target.value});
    }

    handleChange1(event) {
        this.setState({degreeCourse: event.target.value});
    }

    render(){
        return(
            <main className='container'>
                <div class="pure-g">
                    <h1>Insert degree course</h1>
                    <p>Now you can insert a new degree course.</p>
                        <form className="pure-form pure-form-stacked">
                            <fieldset>
                                <label>Academic year</label>
                                <input type="text" value={this.state.year} onChange={this.handleChange} placeholder="Insert a year"/>
                                <label>Degree Course</label>
                                <input type="text" value={this.state.degreeCourse} onChange={this.handleChange1} placeholder="Insert a degree course"/>

                                <input type="submit" value="Save" />
                                <button>Cancel</button> {/*magari è un 'input' o 'a' invece che button che porta alla pagina precedente*/}
                            </fieldset>
                        </form>
                </div>
            </main>    
        )
    }    
}

export default InsertDegreeCourse;