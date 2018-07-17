
import React, { Component } from 'react'
import * as util from '../../utils/validations'
import LoadingData from '../Loading/LoadingData'
import EmptyData from '../Loading/EmptyData'
import {FCPopup, UCPopup}from '../../utils/popup';
import Popup from 'react-popup' 

//import TickButton from './radio_button/components/Application'

const OptionsY = ({ year }) => (
  <option value={year}> {year} </option>
);

const OptionsDC = ({ degreeUnicode }) => (
  <option value={degreeUnicode}> {degreeUnicode} </option>
);

class InsertUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      FCInserted: '', //inserimento codice fiscale 
      UCInserted: '', //inserimento codice univoco 
      tpInserted: JSON.stringify(this.props.typeChecked), //inserting type

      selectedYears: '',
      selectedDegree: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.onInputFCChange = this.onInputFCChange.bind(this)
    this.onInputUCChange = this.onInputUCChange.bind(this)

    this.onSelectChangeY = this.onSelectChangeY.bind(this)
    this.onSelectChangeDC = this.onSelectChangeDC.bind(this)


  }

  onInputFCChange(event) {
    this.setState({ FCInserted: event.target.value })
  }

  onInputUCChange(event) {
    this.setState({ UCInserted: event.target.value })
  }

  onSelectChangeY(event) {
    this.setState({ selectedYears: event.target.value })
    this.props.readDegreeData(event.target.value)
    this.setState({ selectedDegree: '' })
  }

  onSelectChangeDC(event) {
    this.setState({ selectedDegree: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!util.checkFiscalCode(this.state.FCInserted)) {
      Popup.queue(FCPopup)
      Popup.clearQueue()
    }
    else{
      if (this.state.UCInserted.length !== 10 || !util.checkUniqueCode(this.state.UCInserted)) {
        Popup.queue(UCPopup)
        Popup.clearQueue()
      }
      else{
        event.preventDefault();
        this.props.onInsertUserFormSubmit(this.state.FCInserted, this.state.UCInserted, this.state.tpInserted, this.state.selectedDegree)
    
      }
    }
  }

  //for tick boxes

  handleOptionChange(changeEvent) {
    this.setState({
      tpInserted: changeEvent.target.value
    })
    if (changeEvent.target.value === 3) {
      this.props.readAcademicData();
      //getDegrees
    }
  }

  componentDidMount() {
    this.props.readAcademicData();
  }


  render() {
    const load = this.props.loadingDegree || this.props.loadingAcademic || this.props.ipfsLoading ? <div className="container_gif"> <LoadingData label='Loading...' /> </div> : <div />;
    const error = this.props.success === false ? <div>There was an error...</div> : <div />;
    const empty = this.props.emptyDegrees ? <EmptyData label='no data found on blockchain' /> : <div />

    return (
      <div>
        <main className='container'>
          <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
            <fieldset>
              <label htmlFor="FC">Fiscal Code</label>
              <input id="FC" type="text" value={this.state.FCInserted} onFocus={Popup.close()} onChange={this.onInputFCChange} placeholder="FC" />
              <span className="pure-form-message">This is a required field.</span>

              <br />

              <label htmlFor="UC">Unique code</label>
              <input id="UC" type="text" value={this.state.UCInserted} onFocus={Popup.close()} onChange={this.onInputUCChange} placeholder="UC" />
              <span className="pure-form-message">This is a required field.</span>

              <br />

              <label htmlFor="UC">User type</label>
              <div className="row">
                <div className="col-sm-12">


                  <div className="radio">
                    <label>
                      <input disabled={this.props.isUni ? false : true} type="radio" value="1" checked={this.state.tpInserted === '1' ? true : false} onChange={this.handleOptionChange} />
                      Administrator
                </label>
                  </div>

                  <div className="radio">
                    <label>
                      <input type="radio" value="2" checked={this.state.tpInserted === '2'} onChange={this.handleOptionChange} />
                      Teacher
                </label>
                  </div>

                  <div className="radio">
                    <label>
                      <input type="radio" value="3" checked={this.state.tpInserted === '3'} onChange={this.handleOptionChange} />
                      Student
                </label>
                  </div>
                </div>
              </div>
              {load}
              {error}
              {empty}
              {this.state.tpInserted === '3' && this.props.loadingAcademic !== true && this.props.loadingDegree !== true && this.props.ipfsLoading !== true &&
                < div className='pure-form pure-form-stacked '>
                  <label htmlFor="years"> Select academic year </label>
                  <select type="text" name="years" value={this.state.selectedYears} onChange={this.onSelectChangeY}>
                    {<option value="select year" disabled={this.state.selectedYears === "" ? false : true}> -- select a year -- </option>}
                    {this.props.emptyAcademicYears === false &&
                      this.props.academicYears.map((rowData, index) => <OptionsY key={index} {...rowData} />)}
                  </select>
                  <label htmlFor="degree"> Select degree </label>
                  <select disabled={this.state.selectedYears === "" ? true : false} type="text" name="degree" value={this.state.selectedDegree} onChange={this.onSelectChangeDC}>
                    {<option value="select degree" disabled={this.state.selectedDegree === "" ? false : true}> -- select a degree -- </option>}
                    {/* { console.log('this.props.degrees: ' + JSON.stringify(this.props.degrees))} */}
                    {this.props.emptyDegrees === false && this.props.successDegree === true &&
                      this.props.degrees.map((rowData, index) => <OptionsDC key={index} {...rowData} />)}
                  </select>
                </div>
              }

              {/* <button className="btn btn-default" type="submit">Save</button> */}
              {/* </form> */}

              {/* </div> */}

              <span className="pure-form-message">This is a required field.</span>

              <br />

              <div className="div_button_insertuser">
                <button type="submit" className="pure-button pure-button-primary">Insert new user</button>
              </div>

            </fieldset >
          </form >
        </main>
      </div >
    )
  }
}


export default InsertUserForm

