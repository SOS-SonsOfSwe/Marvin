import React from 'react';
import { Link } from 'react-router'
import { checkExam } from '../../../../utils/validations';
import Popup from 'react-popup'


class InsertExam extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Class: this.props.Class,
      type: 'Written',
      place: '',
      date: '',
      time: '',
      unicode: '',
      classUnicode: ''
    }

    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange3(event) {
    this.setState({ type: event.target.value });
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

  handleChange9(event) {
    this.setState({ unicode: event.target.value });
  }

  handleSave(event) {

    event.preventDefault();
    let pop = checkExam(this.state);
    if (pop !== null) {
      // console.log("dentro l'if")
      Popup.queue(pop)
      Popup.clearQueue()
    }
    else {
      let examData = {
        "type": this.state.type,
        "place": this.state.place,
        "date": this.state.date,
        "time": this.state.time,
        "classUnicode": this.state.Class
      }

      this.props.addExam(this.state.Class, this.state.unicode, examData);
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
          <h1>Insert an exam</h1>
          <p>Now you can insert a new exam.</p>
          <form className="pure-form pure-form-stacked" onSubmit={this.handleSave}>
            <fieldset>
              <label>Class</label>
              <input type="text" value={this.state.Class} readOnly="true" />
              <label>Exam type</label>
              <select type="text" value={this.state.type} onChange={this.handleChange3} placeholder="Insert the exam type">
                <option value="Written">Written</option>
                <option value="Practice"> Practice </option>
                <option value="Oral"> Oral </option>
              </select>
              <label>Place</label>
              <input type="text" value={this.state.place} onChange={this.handleChange5} placeholder="Insert a place" />
              <label>Date</label>
              <input type="date" value={this.state.date} onChange={this.handleChange6} placeholder="Insert a date" />
              <label>Time</label>
              <input type="time" value={this.state.time} onChange={this.handleChange7} placeholder="Insert a time" />
              <label>Unicode</label>
              <input type="text" value={this.state.unicode} onChange={this.handleChange9} onFocus={Popup.close()} placeholder="Insert a unicode" />
              <span className="exam-span">The format must be the class code plus "-" and the exam number.</span>
              <div className="div-buttons">
                <input type="submit" value="Save" />
                <Link to='/profile/classes'>
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

export default InsertExam;