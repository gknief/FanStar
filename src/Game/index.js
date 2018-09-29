import React, { Component } from "react";

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: '',
            time: '',
            location: '',
            awayTeam: [],
            homeTeam: []
        }
    }

    gameClick = () => {
        this.setState({
            awayTeam: this.props.awayTeam,
            homeTeam: this.props.homeTeam
        })
        return;
    }

    render() {
        return (
        <div className="Game">
        <div>{this.props.awayTeam} vs. {this.props.homeTeam}</div> 
        <div>Location: {this.props.location}</div>
        <div>Date: {this.props.date}</div>
        <div>
            <button onClick={this.state.gameClick}></button>
        </div>
        </div>
        );
    }
}

export default Game;