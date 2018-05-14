import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      FC: '',
      UC: ''
    }
  }

  onInputChange(event) {
    this.setState({ FC: event.target.value})
  }

  onInputChange1(event) {
    this.setState({ UC: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    if ((this.state.FC.length < 2) || (this.state.UC.length < 2))
    {
      return alert('Please fill in your fiscal code and univocal code.')
    }

    this.props.onSignUpFormSubmit(this.state.FC, this.state.UC)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="FC">Fiscal code</label>
          <input id="FC" type="text" value={this.state.FC} onChange={this.onInputChange.bind(this)} placeholder="Fiscal code" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="UC">Univocal code</label>
          <input id="UC" type="text" value={this.state.UC} onChange={this.onInputChange1.bind(this)} placeholder="Univocal code" />
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
