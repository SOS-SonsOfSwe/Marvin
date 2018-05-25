import React, { Component } from 'react'
import { Link } from 'react-router'

import { OnlyAuthLinks, OnlyGuestLinks, OnlyUniAdminLinks } from './NavButtons'
import logo from '../../../public/media/unipd_logo.png'
// import '../node_modules/bootstrap/scss/bootstrap.scss'

// Styles
/*import '../stylesheets/oswald.scss'
import '../stylesheets/open-sans.scss'*/
import './pure-min.scss'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
            <OnlyUniAdminLinks />
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