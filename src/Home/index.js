import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Signup from "../Signup";
import Login from "../Login";
import './style.css';

export default class Home extends Component {
    render() {
        return (
            
                <div className="home-container">
                    {/* <nav className="home-nav">
                        <Link to="/signup">Sign Up</Link>
                        &nbsp;
                        <Link to="/login">Log In</Link>
                        
                    </nav> */}
                  
                        {/* <Link to='/'> */}

                            <img className="logo" src="../images/fan_star_logo1.png" />
                            <h1 className="fanstar"><span className="f-in-fanstar">F</span>an <span className="f-in-fanstar">S</span>tar</h1>
                            {/* </Link> */}
                   
                    <h1>The Most Valuable Fans</h1>
                    <div className="home-buttons">
                        <button className='login-button'><Link to='/login'>Log In</Link></button> <br></br><br></br>
                        <button className='signup-button'><Link to='/signup'>Sign Up</Link></button>
                    </div>
                </div>
                

                )
            }
        }
