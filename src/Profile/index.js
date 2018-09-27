import React, { Component } from "react";
import Game from "../Game";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Grant Knief',
            id: 1,
            favoriteTeam: 'New York Yankees',
            games: 30,
            rank: 10
        }
    }

    render() {
        return (
        <div className="Profile">
        <div>{this.state.name}</div>
        <div>Fan rank: {this.state.rank}</div>
        <div>Favorite team: {this.state.favoriteTeam}</div>
        <div>Number of games attended: {this.state.games}</div>
        <div>Games I've attended:
        <Game />
        </div>
        </div>
        );
    }
}

export default Profile;