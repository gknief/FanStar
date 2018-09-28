import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./style.css";
import Home from '../Home';
import Profile from "../Profile";
import Signup from "../Signup";
import Login from "../Login";
import GameList from "../GameList";
import PrivateRoute from "../PrivateRoute";


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
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/gamelist" component={GameList} />
        </div>
      </Router>
    );
  }
}

export default App;
