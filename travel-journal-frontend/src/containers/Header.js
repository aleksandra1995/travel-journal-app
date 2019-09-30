import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'







class Header extends Component {

    handleSignOut = () => {

        if (localStorage.token) {
            localStorage.clear()
            this.props.history.push('/')
            this.props.clearUser()
        }else(alert("You must first sign in to be able to sign out. Not a member? Sign up today!"))
       
    }

    goHome = () => {
        
        this.props.history.push('/')
    }

    handleGoToProfile = () => {
        if (localStorage.token) {
            this.props.history.push('profile')
        }else(alert("You must sign in!"))  
    }

    handleGoToMap = () => {
        if (localStorage.token) {
            this.props.history.push('map')
        }else(alert("You must sign in to track the places you have traveled!"))  
    }
    render() {

        

        return (
            <div className="header">
                Welcome to Travel Journal
                <br></br>
                {localStorage.token ? 
                this.props.user.first_name ?
                `Hello ${this.props.user.first_name}`  
                : `Hello ${this.props.user.username}`
                : 
                "Join in on a journey to memories"
                
                }
                
                    <button className="headeroriginalButton" onClick={this.goHome}>Home</button>
                    <button className="headeroriginalButton" onClick={this.props.addStoryButton}>Add Story</button>
                    <button className="headeroriginalButton" onClick={this.handleSignOut}>Sign Out</button>
                    <button className="headeroriginalButton" onClick={this.handleGoToProfile}>Profile</button>
                    <button className="headeroriginalButton" onClick={this.handleGoToMap}>My Map</button>

                    
        
            </div>
        )
    }
}


export default withRouter(Header)
