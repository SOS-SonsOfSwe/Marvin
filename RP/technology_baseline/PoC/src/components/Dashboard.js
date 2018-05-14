import React, { Component } from 'react'
import InsertUserFormContainer from './Forms/InsertUser/InsertUserFormContainer'
class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Insert user</h1>
            <p><strong>{this.props.authData.payload.FC}</strong>, now you can add a user.</p>             
            <InsertUserFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
