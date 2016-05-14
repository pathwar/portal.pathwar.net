import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './containers/App'
import LoginPage from './containers/LoginPage'

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path="login" component={LoginPage} />
    </Route>
  </Route>
)
