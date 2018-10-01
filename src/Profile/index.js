import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GameList from "../GameList";
import Game from "../Game";
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
        <div>Name: {this.state.user.firstName} {this.state.user.lastName}</div>
        <div>Email: {this.state.user.email}</div>
        <div>Fan Score: {Math.floor(this.state.gameList.length / 1271 * 5000)}</div>
        <div>Favorite team: {this.state.user.favoriteTeam}</div>
        <div><Link to="./gamelist"><button className="add-game-button">Add new game:</button></Link> </div>
        <div>Number of games attended: {this.state.gameList.length}</div>
        <div>Games I've attended:</div>
        <GamesAttended/>
      </div>


    );
  }
}

export default Profile;