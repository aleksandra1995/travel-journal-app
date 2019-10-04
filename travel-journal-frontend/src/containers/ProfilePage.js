import React, { Component } from 'react'
import Header from './Header'
import Posts from '../components/Posts'


 class ProfilePage extends Component {

     state = {
         editProfileClicked: false,
         first_name: '',
         last_name: '',
         locations_traveled: '',
         bio: '',
         email: ''
     }

     editProfileClicked = () => {
         this.setState({
            editProfileClicked: !this.state.editProfileClicked
         })
     }

     handleChangeOnEdit = (e) => {
         this.setState({
             [e.target.name]: e.target.value
         })
     }

     handleSubmittedUpdateForm = (e) => {
        e.preventDefault()
        this.props.editProfile(this.state)
        this.setState({editProfileClicked: false})
    }

    render() {  

    let usersChapters

    if (this.props.chapters) {
        usersChapters = this.props.chapters.map((chapter) => {
            if (chapter.user.id === this.props.user.id) {
                return <li><Posts handleUploadToChapters={this.props.handleUploadToChapters} handleFileAddedToChapters={this.props.handleFileAddedToChapters} editChapter={this.props.editChapter} deleteChapter={this.props.deleteChapter}key={chapter.id} handleClickedChapter={this.props.handleClickedChapter} {...chapter}/></li>
            }
        }) 
    }   

    return (
        <div className="Profile-Container">
            <Header 
            clearUser={this.props.clearUser}
            addStoryButton={this.props.addStoryButton}
            user={this.props.user}/>
            <div className="profileDiv">
        
                <div>
   
           
                    { this.state.editProfileClicked || this.props.newUser ?
                    <div className="editProfile"> 
                    <strong className="text">
                        Please fill out your Profile
                    </strong>

                    <form onSubmit={this.handleSubmittedUpdateForm}>
                        <input onChange={this.props.handleFileAdded} type="file" />
                        <br/>
                        <button onClick={this.props.handleUpload}>Upload</button>
                        <br/>
                        <input placeholder="first_name" name="first_name" value={this.state.first_name} onChange={this.handleChangeOnEdit} />
                        <br/>
                        <input placeholder="last_name" name="last_name" value={this.state.last_name} onChange={this.handleChangeOnEdit} />
                        <br/>
                        <input placeholder="locations_traveled" name="locations_traveled" value={this.state.locations_traveled} onChange={this.handleChangeOnEdit} />
                        <br/>
                        <input placeholder="bio" name="bio" value={this.state.bio} onChange={this.handleChangeOnEdit} />
                        <br/>
                        <input placeholder="email" name="email" value={this.state.email} onChange={this.handleChangeOnEdit} />
                        <br/>
                        
                        <br/>
                        <input className="originalButton" type="submit"/>
                    </form>
                 </div>
      : 
                <div > 
      
                    <ul className="usersChapters">
                        { usersChapters}
                    </ul>
                    <div className="profile">
                        <img alt="Image"src={this.props.user.url}/>
                        <h1>{this.props.user.first_name} {this.props.user.last_name} </h1>
                        <h1>{this.props.user.email}</h1>
                        <h1>{this.props.user.locations_traveled}</h1>
                        <h1>{this.props.user.bio}</h1>
                        <button className="originalButton" onClick={this.editProfileClicked}>Edit Profile</button>
                        
                </div>
            </div>
            
            }
            </div>
        </div>
    </div>
        
        )
    }
}

export default ProfilePage
