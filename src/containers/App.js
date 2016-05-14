import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const propTypes = {
  children: PropTypes.object
}

class App extends React.Component {

  componentDidMount() {}

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

App.propTypes = propTypes

const mapStateToProps = () => ({})

const ConnectedApp = connect(
  mapStateToProps
)(App)

export default ConnectedApp
