import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth, VisibleOnlyUni } from '../util/wrappers'
import logo from '../../public/media/unipd_logo.png'
// import '../node_modules/bootstrap/scss/bootstrap.scss'

// UI Components
import LoginButtonContainer from './Buttons/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './Buttons/logoutbutton/LogoutButtonContainer'

// Styles
/*import '../stylesheets/oswald.scss'
import '../stylesheets/open-sans.scss'*/
import '../stylesheets/pure-min.scss'
import '../stylesheets/App.scss'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div className="float-right">
        <ul>
          {/* <li className="pure-menu-item">
          
          <Link to="/dashboard" className="pure-menu-link">Insert User</Link>
                     
          
          </li> */}
          <li className="pure-menu-item">
            <Link to="/profile" className="pure-menu-link">Profile</Link>
          </li>
          <LogoutButtonContainer />
        </ul>
      </div>
    )
    const OnlyUniLinks = VisibleOnlyUni(() =>
      <div className="float-right">
        <ul>
          <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Insert User</Link>
          </li>
          <li className="pure-menu-item">
            <Link to="/profile" className="pure-menu-link">Profile</Link>
          </li>
          <LogoutButtonContainer />
        </ul>
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/signup" className="pure-menu-link">Sign Up</Link>
        </li>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
            <OnlyUniLinks />
          </ul>
          <Link to="/"> 
            <img className="logo" src={logo} alt="My logo" /> 
          </Link> 
          {/* <Link to="/" className="pure-menu-heading pure-menu-link">Marvin</Link> */} 
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
