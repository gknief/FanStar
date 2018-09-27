import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Signup from "../Signup";
import Login from "../Login";
import './style.css';

export default class Home extends Component {
    render() {
        return (

                <div className="home-container">

                    <div className="logo">
                        <Link to='/'>
                            <img className="logo" src="../images/fan_star_logo1.png" />
                            <h1 className="fanstar"><span className="f-in-fanstar">F</span>an <span className="f-in-fanstar">S</span>tar</h1></Link>
                    </div>
                    <nav className="home-nav">
                        <Link to="/signup">Sign Up</Link>
                        &nbsp;
                        <Link to="/login">Log In</Link>
                        
                    </nav>
                    <div className="home-photo">
                    
                        <h1>Who's the Number 1 Fan?</h1>
                        <img className='baseball' src='../images/homepage.jpg' />
                        <button className='signup-button'><Link to='/signup'>Sign Up</Link></button>
                    </div>
                </div>
        

                )
            }
        }
