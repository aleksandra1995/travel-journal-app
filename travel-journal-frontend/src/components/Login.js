import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


const API = "http://localhost:3000"

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        this.props.logUserIn(this.state)
        
    }

    handleOnChange = (e) => {
       this.setState({[e.target.name]: e.target.value})
    }


    render() {
 
        return (
            <div>
                Login
                <form onSubmit={this.handleOnSubmit}>
                    <input value={this.state.username} onChange={this.handleOnChange}type="text" name="username" />
                    <br></br>
                    <input value={this.state.password} onChange={this.handleOnChange}type="password" name="password" />
                    <br></br>
                    <input className="originalButton" type="submit"  />

                </form >
            </div>
        )
    }

    
}


export default withRouter(Login)
