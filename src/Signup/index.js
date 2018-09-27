import React, { Component } from "react";

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
        }
    }

    register = async () => {
        const requestBody = JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            favoriteTeam: this.state.favoriteTeam
        })

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
        // this.props.onLogin();
        localStorage.setItem('user_jwt', JSON.stringify(responseBody.token));
    }

    onInputChnge = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
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
}

export default Signup;