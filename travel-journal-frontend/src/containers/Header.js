import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Button from 'react-bootstrap/Button'








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

    handleGoToView =() => {
        if (localStorage.token) {
            this.props.history.push('view')
        }else(alert("You must sign in to view your Journal!"))
    }

    handleGoToAlbum = () => {
        if (localStorage.token) {
            this.props.history.push('album')
        }else(alert("You must sign in to view your Album!"))
    }

    addStoryButton = () => {
        if (localStorage.token) {
            this.props.history.push('addStory')
        }else(alert("You must sign in to add a story!"))
    }
    render() {

        

        return (
            <Navbar bg="dark" variant="dark">
            <div className="header">
                <Navbar.Text className="float-">
                Welcome to Travel Journal
                </Navbar.Text>
                <br></br>
                {localStorage.token ? 
                this.props.user.first_name ?
                <Navbar.Text>
                    Hello {this.props.user.first_name} 
                </Navbar.Text>
                : <Navbar.Text>
                    Hello {this.props.user.username}
                </Navbar.Text>
                : 
                <Navbar.Text>
                    Join in on a journey to memories
                </Navbar.Text>}
                 <Nav className="float-right">
                    <Button variant="outline-light" onClick={this.goHome} >Home</Button>
                    <Button variant="outline-light" onClick={this.handleSignOut}>Sign Out</Button>
                    <Button variant="outline-light" onClick={this.addStoryButton}>Add Story</Button>
                    <Button variant="outline-light" onClick={this.handleGoToProfile}>Profile</Button>
                    <Button variant="outline-light" onClick={this.handleGoToMap}>My Map</Button>
                    <Button variant="outline-light" onClick={this.handleGoToView}>My Journal</Button>
                    <Button variant="outline-light" onClick={this.handleGoToAlbum}>My Album</Button>
                </Nav>  
                   
            </div>
            </Navbar>
        )
    }
}


export default withRouter(Header)
