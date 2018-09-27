import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./style.css";
import Home from '../Home';
import Profile from "../Profile";
import Signup from "../Signup";
import Login from "../Login";


class App extends Component {
  render() {
    return (
      <div>
        <Signup />




        <Home />
      </div>
    );
  }
}

export default App;
