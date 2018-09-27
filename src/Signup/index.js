import React, { Component } from "react";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            favoriteTeam: ''
        }
    }

    register = async () => {
        const body = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            favoriteTeam: this.state.favoriteTeam
        })

        const responseUser = await fetch('api/register', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let webToken = await responseUser.json();
        localStorage.clear();
        localStorage.setItem('user_jwt',webToken);
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
                    <input type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChnge} name="email" />
                    <input type="text" value={this.state.password} placeholder="Password" onChange={this.onInputChnge} name="password" />
                    <input type="text" value={this.state.favoriteTeam} placeholder="Favorite Team" onChange={this.onInputChnge} name="favoriteTeam" />
                    <button type="button" onClick={this.register}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;