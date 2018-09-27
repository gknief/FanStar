import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.css';

export default class Home extends Component {
    render() {
        return (
            <Router>
                <div className="home-container">
                    <div className="logo">
                        <Link to='/'><h1>Fan Star</h1></Link>
                    </div>
                    <nav className="home-nav">
                        <Link to='/signup'>Sign Up</Link>
                        &nbsp;
                        <Link to='/login'>Log In</Link>
                    </nav>
                    <div className="home-photo">
                        <h1>Who's the Number 1 Fan?</h1>
                        <img className='baseball' src='../images/homepage.jpg' />
                        <button className='signup-button'><Link to='/signup'>Sign Up</Link></button>
                    </div>
                </div>

            </Router>
        )
    }
}
