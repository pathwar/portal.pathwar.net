import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './containers/App'

export default (
  <Route>
    <Route path="/" component={App} />
  </Route>
)
