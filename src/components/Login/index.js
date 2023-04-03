import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt-token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    return (
      <div className="login-main-container">
        <div className="login-responsive-container">
          <img
            className="website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="login-input-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUserName}
                placeholder="Username"
                id="username"
                className="login-input"
                type="text"
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                placeholder="Password"
                id="password"
                className="login-input"
                type="text"
              />
            </div>
            <div className="button-container">
              <button className="login-button" type="submit">
                Login
              </button>
            </div>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
