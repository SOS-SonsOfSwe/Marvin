import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated, UniAdminIsAuthenticated } from './authentication/wrappers'
import getWeb3 from '../api/utils/getWeb3'
// Layouts
 
import {App, Home, InsertUser, Loading, NotFound, Profile, SignUp} from './components/index'
/*import App from './components'
import Home from 'components'
import InsertUser from 'components'
import SignUp from 'components'
import Profile from 'components'
import NotFound from 'components'
import Loading from 'components'*/


/*import App from './components/App/App'
import Home from './components/Home/Home'
import InsertUser from './components/InsertUser/InsertUser'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'
import NotFound from './components/NotFound/NotFound'
import Loading from './components/Loading/Loading'*/
//import * as components from './components'

import './index.scss'

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
        <Route path="insert-user" component={UniAdminIsAuthenticated(InsertUser)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="loading" component={UserIsAuthenticated(Loading)} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
),
  document.getElementById('root')
)
