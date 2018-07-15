import React, { Component } from 'react'
import { Link } from 'react-router'

import { OnlyAuthLinks, OnlyGuestLinks, OnlyUniAdminLinks } from './NavButtons'
//import logo from '../../../public/media/Marvin_title.png'
// import '../node_modules/bootstrap/scss/bootstrap.scss'

// Styles
/*import '../stylesheets/oswald.scss'
import '../stylesheets/open-sans.scss'*/
import './pure-min.scss'
import './App.scss'
import './Mobile.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal top-navbar">
          <ul className="pure-menu-list navbar-right">
            {/* <Link to="/costs" className="pure-menu-link">Costs</Link> */}
            <OnlyGuestLinks />
            <OnlyAuthLinks />
            <OnlyUniAdminLinks />
          </ul>

          <Link to="/">
            <div className="logo_div"></div>
            {/* <img className="logo" src={logo} alt="My logo" /> */}
          </Link>

          {/* <Link to="/" className="title">Marvin</Link> */}
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App