import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {errorMsg: '', username: '', password: '', showSubmit: false}

  inputChange = event => {
    this.setState({username: event.target.value})
  }

  passChange = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = msg => {
    this.setState({showSubmit: true, errorMsg: msg})
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmit, errorMsg, username, password} = this.state
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.formSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="wesite logo"
            className="web-logo"
          />
          <div className="input-details">
            <label htmlFor="username" className="label-username">
              USERNAME
            </label>
            <input
              type="text"
              className="username"
              placeholder="Username"
              onChange={this.inputChange}
              value={username}
            />
          </div>
          <div className="input-details">
            <label htmlFor="password" className="label-password">
              PASSWORD
            </label>
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={this.passChange}
              value={password}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showSubmit && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
