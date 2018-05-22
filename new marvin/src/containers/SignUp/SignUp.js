import React, { Component } from 'react'
import SignUpFormContainer from '../../components/Forms/SignUp/SignUpFormContainer'

class SignUp extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Sign Up</h1>
            <p>We've got your wallet information, simply input your fiscal code and univocal code and your account is made!</p>
            <SignUpFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default SignUp
