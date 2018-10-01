import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from "../Game";


class GameList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameList: [],
      user: {}
    }
  }

  componentDidMount = async () => {
    await this.fetchUser();
    this.fetchGames();
    
  }

  fetchGames = async () => {
    const response = await fetch(`/api/${this.state.user.favoriteTeam}/games`)
    console.log(this.state.user.favoriteTeam);
    
    const gameList = await response.json();
    this.setState({
      gameList: gameList
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

  addGames = async id => {
    await fetch('/api/current-user', {
      method: 'PUT',
      body: JSON.stringify({gameId: id}),
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('user_jwt')
      }
    });
    this.fetchUser();
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
                addGame={this.state.user.gameId === game.id}
                onClickFavoriteButton={() => this.addGames(game.id)}
              />
            );
          })}
        </div>
      );
    }
  }

  export default GameList;