import React, { Component } from 'react'
import * as utils from '../../../utils/validations'

import ipfsPromise from '../../../../api/utils/ipfsPromise'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      surname: '',
      email: '',
      FC: '',
      UC: ''
    }
  }

  onInputNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onInputSurnameChange(event) {
    this.setState({ surname: event.target.value })
  }

  onInputEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onInputFCChange(event) {
    this.setState({ FC: event.target.value })
  }

  onInputUCChange(event) {
    this.setState({ UC: event.target.value })
  }


  handleSubmit(event) {
    event.preventDefault()

    if (!utils.checkFiscalCode(this.state.FC) || !utils.checkUniqueCode(this.state.UC) || !utils.checkMail(this.state.email)) {
      return alert('Please fill in all the details correctely')
    }

    var userData = {
      "name": this.state.name,
      "surname": this.state.surname,
      "email": this.state.email,
      "FC": this.state.FC,
      "UC": this.state.UC
    }

    var ipfs = new ipfsPromise()

    ipfs.pushJSON(userData).then(hashIPFS =>
      this.props.onSignUpFormSubmit(userData, ipfsPromise.getBytes32FromIpfsHash(hashIPFS)))
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputNameChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="surname">Surname</label>
          <input id="surname" type="text" value={this.state.surname} onChange={this.onInputSurnameChange.bind(this)} placeholder="Surname" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="email">eMail</label>
          <input id="email" type="text" value={this.state.email} onChange={this.onInputEmailChange.bind(this)} placeholder="eMail" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="FC">Fiscal code</label>
          <input id="FC" type="text" value={this.state.FC} onChange={this.onInputFCChange.bind(this)} placeholder="Fiscal code" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="UC">Univocal code</label>
          <input id="UC" type="text" value={this.state.UC} onChange={this.onInputUCChange.bind(this)} placeholder="Univocal code" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <div className="div_button_signup">
            <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
          </div>

        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
