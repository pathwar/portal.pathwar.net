  import React from 'react'
import { Provider } from 'react-redux'

import { Router, browserHistory } from 'react-router'
import routes from '../routes'

import DevTools from './DevTools'

export default class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
