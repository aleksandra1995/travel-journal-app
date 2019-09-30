import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'






class Signup extends React.Component {
    state = {
      username: '',
      password: ''
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.signUserUp(this.state)
      
      
    }
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }
  
    render() {
      return (
        <div>
          Sign Up!
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} onChange={this.handleChange} name="username" />
          <br></br>
          <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
          <br></br>
          <input className="originalButton" type="submit" value="SignUp!" />
        </form>
        </div>
      );
    }
  }

export default withRouter(Signup)
