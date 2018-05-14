import React from 'react'

class LoginButton extends React.Component { 
  constructor(props) { 
    super(props) 
 
    this.state = { 
      payload: { 
        FC: '', 
        tp: '',
        badgeNumber: '' 
      } 
    } 
  } 
 
  render() {   
  //Login = ({ onLoginUserClick }) => { 
    return( 
      <li className="pure-menu-item"> 
        <a href="#" className="pure-menu-link" onClick={(event) => this.props.onLoginUserClick(event)}>Login</a> 
      </li> 
    ) 
  } 
}

export default LoginButton
