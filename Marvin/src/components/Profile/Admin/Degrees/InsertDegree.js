import React from 'react';
import { Link } from 'react-router'
import { checkDegreeUnicode } from '../../../../utils/validations';
import Popup from 'react-popup'
import { degreeCodePopup, degreeDescriptionPopup } from '../../../../utils/popup'

class InsertDegree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            description: '',
            degreeUnicode: ''
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDegreeUnicodeChange = this.handleDegreeUnicodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    handleDegreeUnicodeChange(event) {
        this.setState({ degreeUnicode: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.state.description === '') {
            Popup.queue(degreeDescriptionPopup)
            Popup.clearQueue()
        }
        else {
            if (!checkDegreeUnicode(this.state.degreeUnicode)) {
                Popup.queue(degreeCodePopup)
                Popup.clearQueue()
            }
            else {
                event.preventDefault()
                this.props.addDegree(this.state.degreeUnicode, this.state.year, this.state.description)
            }
        }
    }

    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
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
                    <h1>Insert degree</h1>
                    <p>Now you can insert a new degree.</p>
                    <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <label>Academic year</label>
                            <input type="text" value={this.state.year} readOnly="true" />
                            <label>Degree description</label>
                            <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Insert the description" />
                            <label>Degree unicode</label>
                            <input type="text" value={this.state.degreeUnicode} onChange={this.handleDegreeUnicodeChange} onFocus={Popup.close()} placeholder="Insert the degree unicode" />
                            <div className="div-buttons">
                                <input type="submit" value="Save" />
                                <Link to='/profile/degrees'>
                                    <button className="button_cancel">
                                        Cancel
                                </button>
                                </Link>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default InsertDegree;