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

                <div className="placesToGo">
               <h1>Explore Places To Go!</h1>
                    <div >
                        <img src="https://www.hellomagazine.com/imagenes/travel/2018103064049/what-to-do-stay-krakow-poland-visit/0-301-905/krakow-poland-t.jpg"/>
                        <a target="_blank" className="text" href="https://www.atlasobscura.com/things-to-do/poland">Explore Poland!</a>
                    </div>
                
                    <div >
                        <img src="https://www.fodors.com/wp-content/uploads/2019/05/00_HERO_Ultimate-Argentina_shutterstock_1109339036.jpg"/>
                        <a target="_blank" className="text" href="https://www.myadventuresacrosstheworld.com/things-to-do-in-argentina/">Explore Argentina!</a>
                    </div>
                    <div >
                        <img src="https://www.roughguides.com/wp-content/uploads/2012/11/amalfi-italy-shutterstock_759048709.jpg"/>
                        <a target="_blank" className="text" href="https://www.myadventuresacrosstheworld.com/category/europe/italy/">Explore Italy!</a>
                    </div>
                    <div >
                        <img src="https://images.prop24.com/221635619"/>
                        <a target="_blank" className="text" href="https://www.myadventuresacrosstheworld.com/category/europe/portugal/">Explore Portugal!</a>
                    </div>
                    
                
                </div>
               
               
                
            </div>
        )
       
    }

    
}


export default HomePage
