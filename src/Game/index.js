import React, { Component } from "react";

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            team1: '',
            team2: '',
            date: '',
            location: '',
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
        <div>{this.state.team1} vs. {this.state.team2}</div> 
        <div>Location: {this.state.location}</div>
        <div>Date: {this.state.date}</div>
        <div>
            <button onClick={this.state.gameClick}></button>
        </div>
        </div>
        );
    }
}

export default Game;