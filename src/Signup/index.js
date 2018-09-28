import React, { Component } from "react";
import Profile from '../Profile';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            favoriteTeam: '',
            errorMessage: '',
            isRegistered: false
        }
    }

    register = async () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
        const requestBody = JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            favoriteTeam: this.state.favoriteTeam
        })
        
        if (this.state.firstName === '') {
            alert('Please Provde Your First Name');
        } else if
        (this.state.lastName === '') {
            alert('Please Provde Your Last Name');
        } else if
        (!emailRegex.test(this.state.email)) {
            alert('Please Provide Valid Email Address');
        } else if
        (this.state.password.length < 7) {
            alert('Password Must Be At Least 7 Characters')
        } else if
        (!passwordRegex.test(this.state.password)) {
            alert('Password Must Contain 1 Number and 1 Special Character');
        } else {

            const response = await fetch('api/register', {
                method: 'POST',
                body: requestBody,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseBody = await response.json();
            if (response.status === 409) {
                this.setState({
                    errorMessage: responseBody.message
                });
                return;
            }
            localStorage.setItem('user_jwt', JSON.stringify(responseBody.token));
            this.setState({
                isRegistered: true
            })
        }
    }

    onInputChnge = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (!this.state.isRegistered) {
            return (
                <div className="Signup">
                    <form onSubmit={this.register}>
                        <input type="text" value={this.state.firstName} placeholder="First Name" onChange={this.onInputChnge} name="firstName" />
                        <input type="text" value={this.state.lastName} placeholder="Last Name" onChange={this.onInputChnge} name="lastName" />
                        <input type="text" value={this.state.favoriteTeam} placeholder="Favorite Team" onChange={this.onInputChnge} name="favoriteTeam" />
                        <input type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChnge} name="email" />
                        <input type="text" value={this.state.password} placeholder="Password" onChange={this.onInputChnge} name="password" />
                        <button type="button" onClick={this.register}>Sign Up</button>
                    </form>
                </div>
            )
        }
        return (
            <Profile />
        )
    }
}

export default Signup;