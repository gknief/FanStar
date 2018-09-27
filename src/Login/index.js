import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    onInputChnge = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async () => {
        const requestBody = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        });

        const response = await fetch('/api/login', {
            method: 'POST',
            body: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseBody = await response.json();
        if (response.status === 401) {
            this.setState({
                errorMessage: responseBody.message
            });
            return;
        }
        this.props.onLogin();
        localStorage.setItem('user_jwt', responseBody.token);
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.email} onChange={this.onInputChnge} name="email" />
                    <input type="text" value={this.state.password} onChange={this.onInputChnge} name="password" />
                    <button type="button" onClick={this.login}>Log In</button>
                </form>
            </div>
        )
    }
}

export default Login;