import React from 'react';
import { Link } from 'react-router'
import { checkY } from '../../../../utils/validations';
import Popup from 'react-popup'




class InsertAcademicYear extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: ''
        };
        this.handleChange = this.handleChange.bind(this)
        //this.handleSave = this.handleSave.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
 
    handleSubmit(event){
        event.preventDefault()
        let pop=checkY(this.state.year)
        if(pop!==true){
            Popup.queue(pop)
            Popup.clearQueue()
               }
        else{
        event.preventDefault();
        this.props.addAcademicYear(this.state.year)}

    }

    handleChange(event) {
        this.setState({ year: event.target.value });
    }

/*     handleSave(event) {
        event.preventDefault()
        this.props.addAcademicYear(this.state.year)
    } */

    render() {
        return (
            
            <main className='container' /* onSubmit={this.handleSave} */>
                <div className="pure-u-1-1" id="popupContainer">
                <Popup
                    className="mm-popup"
                    btnClass="mm-popup__btn"
                    closeBtn={false}
                    closeHtml={null}
                    defaultOk="Ok"
                    defaultCancel="Cancel"
                    wildClasses={false}
                    escToClose={true}
                />
                    <h1>Insert academic year</h1>
                    <p>Now you can insert a new academic year.</p>
                    <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} onChange={this.handleChange}  placeholder="Insert a new year" />
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