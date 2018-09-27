import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onInputChnge = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.login}>
                    <input type="text" value={this.state.email} onChange={this.onInputChnge} name="email" />
                    <input type="text" value={this.state.password} onChange={this.onInputChnge} name="password" />
                    <button type="button" onClick={this.login}>Log In</button>
                </form>
            </div>
        )
    }
}

export default Login;