import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import LoginPage from './containers/LoginPage'

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRedirect to="login" />
      <Route path="login" component={LoginPage} />
    </Route>
  </Route>
)
