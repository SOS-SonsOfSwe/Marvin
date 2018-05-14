import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated, UniIsAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'
// Layouts
import App from './components/App'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import './stylesheets/index.scss'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UniIsAuthenticated(Dashboard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
