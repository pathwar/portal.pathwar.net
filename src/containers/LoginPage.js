import React from 'react'

export default class LoginPage extends React.Component {
  render() {
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <label>Login</label>
          <input ref="email" type="text" /><br />
          <label>Password</label>
          <input ref="password" type="password" /><br />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }

  _handleSubmit(e) {
    e.preventDefault()
    alert('logged')
  }
}
