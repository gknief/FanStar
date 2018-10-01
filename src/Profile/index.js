import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GameList from "../GameList";
import Game from "../Game";
import "./style.css";

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      games: 0,
      rank: 0,
      editProfile: false,
    }
  }

  componentDidMount = () => {
    this.fetchUser();
    let textArea;
    if (this.state.editProfile) {
      textArea = this.newText
      textArea.focus()
      textArea.select()
    }
  }

  fetchUser = async () => {
    const response = await fetch('/api/current-user', {
      headers: {
        'jwt-token': localStorage.getItem('user_jwt')
      }
    });
    const user = await response.json();
    this.setState({
      user: user
    });
    console.log(this.state.user);
  }

  edit = () => {
    this.setState({
      editProfile: true,
    })
  }

  save = async (e) => {
    e.preventDefault();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const requestBody = JSON.stringify({
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      email: this.state.user.email,
      favoriteTeam: this.state.user.favoriteTeam
    })

    if (this.state.user.firstName === '') {
      alert('Please Provde Your First Name');
    } else if
    (this.state.user.lastName === '') {
      alert('Please Provde Your Last Name');
    } else if
    (!emailRegex.test(this.state.user.email)) {
      alert('Please Provide Valid Email Address');
    } else {

      const response = await fetch('api/register', {
        method: 'PUT',
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
      localStorage.setItem('user_jwt', JSON.stringify(responseBody.token));
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


  renderForm() {
    return (
      <div className="Profile">
        <form onSubmit={this.save}>
          <input type="text" value={this.state.user.firstName} placeholder="First Name" onChange={this.onInputChange} name="firstName" />
          <input type="text" value={this.state.user.lastName} placeholder="Last Name" onChange={this.onInputChange} name="lastName" />
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
          <input type="text" value={this.state.user.email} placeholder="Email" onChange={this.onInputChange} name="email" />
          <button type="button" onClick={this.save}>Save</button>
        </form>
        <div>{this.state.errorMessage}</div>
      </div>

    );
  }

  renderDisplay() {
    return (
      <div className="Profile">
        <button onClick={this.edit} className="edit">Edit</button>
        <div>Name: {this.state.user.firstName} {this.state.user.lastName}</div>
        <div>Email: {this.state.user.email}</div>
        <div>Fan rank: {this.state.rank}</div>
        <div>Favorite team: {this.state.user.favoriteTeam}</div>
        <div><Link to="./gamelist"><button className="add-game-button">Add new game:</button></Link> </div>
        <div>Number of games attended: {this.state.games}</div>
        <div>Games I've attended:{}</div>
      </div>

    );
  }

  render() {
    return this.state.editProfile ? this.renderForm() : this.renderDisplay();
  }
}

export default Profile;