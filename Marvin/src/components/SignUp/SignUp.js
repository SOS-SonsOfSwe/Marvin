import React, { Component } from 'react'
import SignUpFormContainer from '../../containers/SignUp/SignUpFormContainer'

class SignUp extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Sign Up</h1>
            <p>We already know the informations related to your wallet. All you have to do is insert your fiscal code ad your univocal code. After that your account will be created!</p>
            <SignUpFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default SignUp
