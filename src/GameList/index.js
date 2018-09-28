import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from "../Game";


class GameList extends Component {
    constructor(props) {
        super(props)

        this.state = {
    
        }
    }

    render() {
        return (
        <div className="GameList">
            <h1 className="game-list-section">GAMES</h1>
            {this.props.games.map(game => {
              return (
                <Game 
                  team1={game.team1} 
                  team2={game.team2}
                  date={game.date}
                  location={game.location}
                  gameClick={this.gameClick}
                />
              );
            })}
          </div>
        );
    }
}

export default GameList;