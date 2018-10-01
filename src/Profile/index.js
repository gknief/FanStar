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
            rank: 0
        }
    }

    componentDidMount = () => {
        this.fetchUser();
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
      <div className="Profile">
        <Link to="/"><button className="logout" onClick={this.logout}>Log Out</button></Link>
        <div>Name: {this.state.user.firstName} {this.state.user.lastName}</div>
        <div>Email: {this.state.user.email}</div>
        <div>Fan rank: {this.state.rank}</div>
        <div>Favorite team: {this.state.user.favoriteTeam}</div>
        <div><Link to="./gamelist"><button className="add-game-button">Add new game:</button></Link> </div>
        <div>Number of games attended: {this.state.games}</div>
        <div>Games I've attended:{}</div>
        <GamesAttended/>
      </div>


    );
  }
}

export default Profile;