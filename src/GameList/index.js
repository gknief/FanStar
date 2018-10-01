import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from "../Game";


class GameList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameList: [],
    }
  }


  componentDidMount = async () => {
    this.fetchGames();
  }

  fetchGames = async () => {
    const response = await fetch('/api/games')
    const gameList = await response.json();
    this.setState({
      gameList: gameList
    })
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

export default GameList;