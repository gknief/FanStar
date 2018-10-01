import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import "./style.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      favoriteTeam: 'Boston Bruins',
      errorMessage: '',
      isRegistered: false
    }
  }

  register = async e => {
    e.preventDefault();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
    const requestBody = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      favoriteTeam: this.state.favoriteTeam
    })

    if (this.state.firstName === '') {
      alert('Please Provde Your First Name');
    } else if
    (this.state.lastName === '') {
      alert('Please Provde Your Last Name');
    } else if
    (!emailRegex.test(this.state.email)) {
      alert('Please Provide Valid Email Address');
    } else if
    (this.state.password.length < 7) {
      alert('Password Must Be At Least 7 Characters')
    } else if
    (!passwordRegex.test(this.state.password)) {
      alert('Password Must Contain 1 Number and 1 Special Character');
    } else {

      const response = await fetch('api/register', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseBody = await response.json();
      if (response.status === 409) {
        this.setState({
          errorMessage: responseBody.message
        });
        return;
      }
      localStorage.setItem('user_jwt', responseBody.token);
      this.setState({
        isRegistered: true
      })
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if (this.state.isRegistered) {
      const { from } = this.props.location.state || { from: { pathname: "/profile" } };
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="Signup">
        <div className="registration-form">
          <form onSubmit={this.register}>
            <div className="logo-login">
              <Link to='/'>
                <img className="star" src="../images/fan_star_logo1.png" />
              </Link>
              <h1 className="fanstar-login"><span className="font-span">F</span>an <span className="font-span">S</span>tar</h1>
            </div>
            <div className="signup-input-container">
              <input className="registration-input" type="text" value={this.state.firstName} placeholder="First Name" onChange={this.onInputChange} name="firstName" />
              <input className="registration-input" type="text" value={this.state.lastName} placeholder="Last Name" onChange={this.onInputChange} name="lastName" />
              <input className="registration-input" type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChange} name="email" />
              <input className="registration-input" type="password" value={this.state.password} placeholder="Password" onChange={this.onInputChange} name="password" />
              <select name="favoriteTeam" onChange={this.onInputChange}>
                <optgroup label="Atlantic Division">
                  <option>Boston Bruins</option>
                  <option>Buffalo Sabres</option>
                  <option>Detroit Red Wings</option>
                  <option>Florida Panthers</option>
                  <option>Montreal Canadiens</option>
                  <option>Ottawa Senators</option>
                  <option>Tampa Bay Lightning</option>
                  <option>Toronto Maple Leafs</option>
                </optgroup>
                <optgroup label="Metropolitan Division">
                  <option>Carolina Hurricanes</option>
                  <option>Columbus Blue Jackets</option>
                  <option>New Jersey Devils</option>
                  <option>New York Islanders</option>
                  <option>New York Rangers</option>
                  <option>Philadelphia Flyers</option>
                  <option>Pittsburgh Penguins</option>
                  <option>Washington Capitals</option>
                </optgroup>
                <optgroup label="Central Division">
                  <option>Chicago Blackhawks</option>
                  <option>Colorado Avalanche</option>
                  <option>Dallas Stars</option>
                  <option>Minnesota Wild</option>
                  <option>Nashville Predators</option>
                  <option>St. Louis Blues</option>
                  <option>Winnipeg Jets</option>
                </optgroup>
                <optgroup label="Pacific Division">
                  <option >Anaheim Ducks</option>
                  <option>Arizona Coyotes</option>
                  <option>Calgary Flames</option>
                  <option>Edmonton Oilers</option>
                  <option>Los Angeles Kings</option>
                  <option>San Jose Sharks</option>
                  <option>Vancouver Canucks</option>
                  <option>Vegas Golden Knights</option>
                </optgroup>
              </select>
              <br></br>
              <button type="button" onClick={this.register} className="register-button">Sign Up</button>
              <div>{this.state.errorMessage}</div>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

export default Signup;