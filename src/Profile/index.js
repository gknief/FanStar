import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GamesAttended from "../GamesAttended"
import "./style.css";

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      games: 0,
      rank: 0,
      gameList: [],
      editProfile: false,
    }
  }

  componentDidMount = async () => {
    await this.fetchUser();
    this.fetchGames();
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
  }

  fetchGames = async () => {
    const response = await fetch(`/api/${this.state.user.userId}/userGames`);
    const gameList = await response.json();

    this.setState({
      gameList: gameList,
    })
  }

  edit = () => {
    this.setState({
      editProfile: true,
    })
  }

  save = async () => {

    const requestBody = JSON.stringify({
      favoriteTeam: this.state.favoriteTeam
    })
    const response = await fetch(`/api/users/${this.state.user.userId}`, {
      method: 'PUT',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(this.state.user.userId);
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout = () => {
    localStorage.clear();
  }

  renderForm() {
    return (
      <div className="Profile">
        <form onSubmit={this.save}>
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
          <button type="button" onClick={this.save}>Save</button>
        </form>
      </div>

    );
  }

  renderDisplay() {
    return (
      <div className="profile-container">
        <Link to="/"><button className="logout" onClick={this.logout}>Log Out</button></Link>
        <button className="edit" onClick={this.edit}>Edit</button>
        <Link to='/'>
          <img className="profile-star1" src="../images/fan_star_logo1.png" />
        </Link>
        <Link to='/'>
          <img className="profile-star2" src="../images/fan_star_logo1.png" />
        </Link>
        <div className="user-information">
          <div className="user-name">Name: <span>{this.state.user.firstName} {this.state.user.lastName}</span></div>
          <div className="user-email">Email: <span>{this.state.user.email}</span></div>
          <div className="favorite-team">Favorite team: <span>{this.state.user.favoriteTeam}</span></div>
          <div className="number-games">Number of games attended: <span>{this.state.gameList.length}</span></div>
          <div className="fan-score">Fan Score: <span>{Math.floor(this.state.gameList.length / 1271 * 5000)}</span></div>
          <div><Link to="./gamelist"><button className="add-game-profile">Add new game</button></Link> </div>
        </div>
        <div className="i-attended">I've attended:</div>
        <GamesAttended />
      </div>
    );
  }
  render() {
    return this.state.editProfile ? this.renderForm() : this.renderDisplay();
  }
}

export default Profile;