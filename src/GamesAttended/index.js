import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Game from "../Game";
import GameList from "../GameList"


class GamesAttended extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '', 
      gameList: [],
      addGame: {},
    }
  }

  componentDidMount = async () => {
    await this.fetchUser();
    this.fetchGames();
  }

  fetchGames = async () => {
    const response = await fetch(`/api/${this.state.user.userId}/userGames`);
    const gameList = await response.json();

    this.setState({
      gameList: gameList,
    })
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

  render() {
    return (
      <div className="GameList">
        <h1 className="game-list-section">GAMES</h1>
        {this.state.gameList.map(game => {
          return (
            <Game
              key={game.id}
              date={game.date}
              time={game.time}
              location={game.location}
              awayTeam={game.awayTeam}
              homeTeam={game.homeTeam}
            />
          );
        })}
      </div>
    );
  }
}

export default GamesAttended;