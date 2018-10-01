import React, { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameAttended: false
    }
  }


  gameClick = () => {
    this.setState({
      gameAttended: true
    })
    return;
  }

  render() {
    return (
      <div className="Game">
        <div>{this.props.homeTeam} vs. {this.props.awayTeam}</div>
        <div>Location: {this.props.location}</div>
        <div>Date: {this.props.date}</div>
        <div>
          <button className = "add-game-button" onClick={this.props.onClick}>Add Game</button>
        </div>
      </div>
    );
  }
}

export default Game;