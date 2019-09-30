import React, { Component } from 'react'
import Header from './Header'
import AuthFolder from './AuthFolder'
import PostContainer from './PostContainer'




class HomePage extends Component {

    render() {
        return (
            <div >
                <Header
                user={this.props.user}
                clearUser={this.props.clearUser}
                addStoryButton={this.props.addStoryButton}/>

                {localStorage.token ? null :<AuthFolder
                signUserUp={this.props.signUserUp}
                logUserIn={this.props.logUserIn} />}

               <h1>Explore Places To Go!</h1>
               
               
                
            </div>
        )
       
    }

    
}


export default HomePage
