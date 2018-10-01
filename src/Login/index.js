import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isLoggedIn: false
    }
  }

  onInputChnge = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = async e => {
    e.preventDefault();
    const requestBody = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    const response = await fetch('/api/login', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.json();
    if (response.status === 401 || response.status === 400) {
      this.setState({
        errorMessage: responseBody.message
      });
    } else {
      this.props.onLogin;
      localStorage.setItem('user_jwt', responseBody.token);
      this.setState({
        isLoggedIn: true
      })
    }
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    if (this.state.isLoggedIn) {
      const { from } = this.props.location.state || { from: { pathname: "/profile" } };
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="login-container">
        <div className="Login">
          <form onSubmit={this.login}>
            <div className="logo-login">
              <Link to='/'>

                <img className="star" src="../images/fan_star_logo1.png" />
                <h1 className="fanstar-login"><span className="font-span">F</span>an <span className="font-span">S</span>tar</h1>
              </Link>
            </div>
            <div className="input-container">
              <input type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChnge} name="email" /><br></br><br></br><br></br>
              <input type="password" value={this.state.password} placeholder="Password" onChange={this.onInputChnge} name="password" /><br></br><br></br>
              <button type="button" onClick={this.login}>Log In</button>
              <div>{this.state.errorMessage && <p className="login-error-message">{this.state.errorMessage}</p>}</div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default Login;