import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from "../Game";


class GameList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameList: []
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
        <div className="game-list-page">
        {this.state.gameList.map(game => {
          return (
            <Game
              key={game.id}
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
              location={game.location}
              date={game.date}
            />
          );
        })}
      </div>

        );
    }
}

export default GameList;