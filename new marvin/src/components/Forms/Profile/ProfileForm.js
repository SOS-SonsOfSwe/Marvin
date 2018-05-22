import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      surname: this.props.surname
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }
  onInputChange1(event) {
    this.setState({ surname: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if ((this.state.name.length < 2) || (this.state.surname.length < 2))
    {
      return alert('Please fill in your name or surname.')
    }

    this.props.onProfileFormSubmit(this.state.name, this.state.surname)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
         <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="surname">Surname</label>
          <input id="surname" type="text" value={this.state.surname} onChange={this.onInputChange1.bind(this)} placeholder="Surname" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
