import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Game from "../Game";
import GameList from "../GameList"


class GamesAttended extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameList: [],
      addGame: {},
    }
  }

  addGame = (gameId) => {
    const currentGame = this.state.gameList.filter(game => game.id === gameId)[0];
    this.setState({
      currentGame
    });
  }

  render() {
    return (
      <div className="game-library">
        {/* <GameList games={this.state.currentGame} currentGame={this.state.currentGame} setCurrentGame={this.setCurrentGame} /> */}
        {/* <GameDetails game={this.state.currentGame} /> */}
      </div>
    );
  }
}

// GameListItem = (props) => {
//   const setCurrentGame = () => {
//     props.setCurrentGame(props.id);
//   }

  // const selectedClass = props.currentGame.id === props.id ? 'game-list-item--selected' : '';

//   return (
//     <div className={`game-list-item ${selectedClass}`} onClick={setCurrentGame}>
//       <div className="game-list-item-info-wrapper">
//         <h2 className="game-list-item-title">{props.location}</h2>
//         <p>{props.awayTeam}</p>
//       </div>
//     </div>
//   )
// }

// GameList = (props) => {
//   return (
//     <div className="game-list">
//       <h1 className="game-list-section-title">GAMES</h1>
//       {props.gameList.map(game => {
//         return (
//           <GameListItem
//             key={game.id}
//             key={game.id}
//             date={game.date}
//             time={game.time}
//             location={game.location}
//             awayTeam={game.awayTeam}
//             homeTeam={game.homeTeam}
//             setCurrentGame={props.setCurrentGame}
//             currentGame={props.currentGame}
//           />
//         );
//       })}
//     </div>
//   )
// }

// GameDetails = (props) => {
//   return (
//     <div className="game-details">
//       <h1 className="game-details-section-title">{props.game.location}</h1>
//       <h2>{props.game.awayTeam}</h2>
//     </div>
//   );
// }




// render() {
//   if (this.state.addEvent) {
//     const { from } = this.props.location.state || { from: { pathname: "/profile" } };
//     return (
//       <Redirect to={from} />
//     )
//   }
//   return (
//     <div className="GameList">
//       <h1 className="game-list-section">GAMES</h1>
//       {this.state.gameList.map(game => {
//         return (
//           <Game
//             key={game.id}
//             date={game.date}
//             time={game.time}
//             location={game.location}
//             awayTeam={game.awayTeam}
//             homeTeam={game.homeTeam}
//             onClick={() => this.addGames(game.id)}
//           />
//         );
//       })}
//     </div>
//   );
// }
// }

export default GamesAttended;