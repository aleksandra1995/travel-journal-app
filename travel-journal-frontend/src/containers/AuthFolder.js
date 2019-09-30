import React, { Component } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

class AuthFolder extends Component {
    render() {
        return (
            <div className="authHolder">
                <div className="auth">
                <Login logUserIn={this.props.logUserIn}/>
                </div>
                <div className="signup">
                <Signup signUserUp={this.props.signUserUp}/>
                </div>
            </div>
        )
    }
}

export default AuthFolder
