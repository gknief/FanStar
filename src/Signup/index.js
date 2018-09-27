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

    onInputChnge = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="Signup">
                <form onSubmit={this.register}>
                    <input type="text" value={this.state.email} onChange={this.onInputChnge} name="email" />
                    <input type="text" value={this.state.password} onChange={this.onInputChnge} name="password" />
                    <input type="text" value={this.state.favoriteTeam} onChange={this.onInputChnge} name="favoriteTeam" />
                    <button type="button" onClick={this.register}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;