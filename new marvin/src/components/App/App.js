import React, { Component } from 'react'
import { Link } from 'react-router'

import { OnlyAuthLinks, OnlyGuestLinks, OnlyUniAdminLinks } from './NavButtons'
import logo from '../../../public/media/Marvin_title.png'
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
        <nav className="navbar pure-menu pure-menu-horizontal top-navbar">
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
            <OnlyUniAdminLinks />
          </ul>
          <div className="title_div">
            <Link to="/">
              <img className="logo" src={logo} alt="My logo" />
            </Link>
          </div>
          {/* <Link to="/" className="title">Marvin</Link> */}
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App