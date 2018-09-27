import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./style.css";
import Home from '../Home';
import Profile from "../Profile";
import Signup from "../Signup";
import Login from "../Login";


class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user_jwt');
    this.state = {
      userLoggedIn: token || false,
    }
  }

  onLogIn = () => {
    this.setState({
      userLoggedIn: true,
    });
  }

  render() {
    return (
      <div>
        <Signup />
        <Login 
        onLogin={this.onLogIn}
        />




        <Home />
      </div>
    );
  }
}

export default App;
