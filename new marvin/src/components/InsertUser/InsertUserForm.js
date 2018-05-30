
import React, { Component } from 'react'
import * as util from '../../utils/validations'
import sinon from 'sinon'
import {mount} from 'enzyme'

//import TickButton from './radio_button/components/Application'

class InsertUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      FCInserted: '', //inserimento codice fiscale 
      UCInserted: '', //inserimento codice univoco 
      tpInserted: '3' //inserting type 
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.onInputFCChange = this.onInputFCChange.bind(this)
    this.onInputUCChange = this.onInputUCChange.bind(this)
  }

  onInputFCChange(event) {
    this.setState({ FCInserted: event.target.value })
  }

  onInputUCChange(event) {
    this.setState({ UCInserted: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!util.checkFiscalCode(this.state.FCInserted)) {
      return alert('Please fill in correctly your Fiscal Code.')
    }

    if (this.state.UCInserted.length !== 10 || !util.checkUniqueCode(this.state.UCInserted)) {
      return alert('Please fill in correctly your UC.')
    }

    this.props.onInsertUserFormSubmit(this.state.FCInserted, this.state.UCInserted, this.state.tpInserted, event)
  }

  //for tick boxes

  handleOptionChange(changeEvent) {
    this.setState({
      tpInserted: changeEvent.target.value
    })
  }


  render() {
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="FC">Fiscal Code</label>
          <input id="FC" type="text" value={this.state.FCInserted} onChange={this.onInputFCChange} placeholder="FC" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="UC">Unique code</label>
          <input id="UC" type="text" value={this.state.UCInserted} onChange={this.onInputUCChange} placeholder="UC" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="UC">User type</label>
          {/* <TickButton/> */}

          {/* <div className="container"> */}
          <div className="row">
            <div className="col-sm-12">

              {/* <form onSubmit={this.handleFormSubmit}> */}

              <div className="radio">
                <label>
                  <input type="radio" value="1" checked={this.state.tpInserted === '1'} onChange={this.handleOptionChange} />
                  Administrator
                </label>
              </div>

              <div className="radio">
                <label>
                  <input type="radio" value="2" checked={this.state.tpInserted === '2'} onChange={this.handleOptionChange} />
                  Professor
                </label>
              </div>

              <div className="radio">
                <label>
                  <input type="radio" value="3" checked={this.state.tpInserted === '3'} onChange={this.handleOptionChange} />
                  Student
                </label>
              </div>

              {/* <button className="btn btn-default" type="submit">Save</button> */}
              {/* </form> */}

            </div>
          </div>
          {/* </div> */}

          <span className="pure-form-message">This is a required field.</span>

          <br />

          <div className="div_button_insertuser">
            <button type="submit" className="pure-button pure-button-primary">Insert new user</button>
          </div>

        </fieldset>
      </form>
    )
  }
}

const wrapper = mount(<InsertUserForm id="InsertUserForm" />);
export default InsertUserForm

