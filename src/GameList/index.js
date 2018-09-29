import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from "../Game";


class GameList extends Component {
    constructor(props) {
        super(props)

        this.state = {
          user: {},
          favoriteTeam: '',
          games: []
        }
    }

    componentDidMount = () => {
      this.fetchUser();
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
      const response = await fetch('/api/rangers/games')
      const rangers = await response.json();
      this.setState({
        games: rangers,
        favoriteTeam: 'New York Rangers'
      })
    }

    gameClick = async id => {
      await fetch('/api/current-user', {
        method: 'PUT',
        body: JSON.stringify({gameId: id}),
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': localStorage.getItem('user-jwt')
        }
      });
      this.fetchUser();
    }

    render() {
        return (
        <div className="GameList">
            <h1 className="game-list-section">List of upcoming games for the {this.state.favoriteTeam}</h1>
            {this.state.games.map(game => {
              return (
                <Game
                key={game.id} 
                date={game.date}
                time={game.time}
                location={game.location}
                awayTeam={game.awayTeam}
                homeTeam={game.homeTeam}
                gameClick={this.gameClick}
                />
              );
            })}
          </div>
        );
    }
}

export default GameList;