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
      gameList: []
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

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout = () => {
    localStorage.clear();
  }

  render() {
    return (
      <div className="profile-container">
        <Link to="/"><button className="logout" onClick={this.logout}>Log Out</button></Link>
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
        <GamesAttended  />
      </div>
    );
  }
}

export default Profile;