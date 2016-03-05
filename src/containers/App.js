import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return (<div>{this.props.greetings}</div>)
  }
}

const mapStateToProps = (/*state, ownProps*/) => {
  return {
    greetings: 'Welcome to Pathwar.net'
  }
}

const ConnectedApp = connect(
  mapStateToProps
)(App)

export default ConnectedApp
