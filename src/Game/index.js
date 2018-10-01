import React, { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props)

<<<<<<< HEAD
        this.state = {
            date: '',
            time: '',
            location: '',
            awayTeam: [],
            homeTeam: []
        }
=======
    this.state = {
      gameAttended: false
>>>>>>> 64b87091add64642ddc8c80ee94887c51e1f932f
    }
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 64b87091add64642ddc8c80ee94887c51e1f932f
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