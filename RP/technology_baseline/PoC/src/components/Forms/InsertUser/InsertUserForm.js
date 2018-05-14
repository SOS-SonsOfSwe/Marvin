import React, { Component } from 'react'
import * as util from '../../../util/util.js'

//import TickButton from './radio_button/components/Application'

class InsertUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      FCInserted: '', //inserimento codice fiscale 
      UCInserted: '', //inserimento codice univoco 
      tpInserted: '2' //inserting type 
    }
  }

  onInputChange(event) {
    this.setState({ FCInserted: event.target.value}) 
  }

  onInputChange1(event) {
    this.setState({ UCInserted: event.target.value}) 
  }

  handleSubmit(event) {
    event.preventDefault()

    if( !util.checkFiscalCode(this.state.FCInserted) ) {
      return alert('Please fill in correctly your Fiscal Code.')
    }

    if( this.state.UCInserted.length !== 10 || !util.checkUniqueCode(this.state.UCInserted) ) {
      return alert('Please fill in correctly your UC.')
    }

    this.props.onInsertUserFormSubmit(this.state.FCInserted, this.state.UCInserted, this.state.tpInserted) 
  }

  //for tick boxes

  handleOptionChange(changeEvent) {
    this.setState({
      tpInserted: changeEvent.target.value})
  }


  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="FC">Fiscal Code</label>
          <input id="FC" type="text" value={this.state.FCInserted} onChange={this.onInputChange.bind(this)} placeholder="FC" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="UC">Unique code</label>
          <input id="UC" type="text" value={this.state.UCInserted} onChange={this.onInputChange1.bind(this)} placeholder="UC" />
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
                  <input type="radio" value="0" checked={this.state.tpInserted === '0'} onChange={this.handleOptionChange.bind(this)} />
                  Administrator
                </label>
              </div>

              <div className="radio">
                <label>
                  <input type="radio" value="1" checked={this.state.tpInserted === '1'} onChange={this.handleOptionChange.bind(this)}/>
                  Professor
                </label>
              </div>

              <div className="radio">
                <label>
                  <input type="radio" value="2" checked={this.state.tpInserted === '2'} onChange={this.handleOptionChange.bind(this)}/>
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

export default InsertUserForm

