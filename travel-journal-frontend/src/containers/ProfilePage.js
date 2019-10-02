import React, { Component } from 'react'
import Header from './Header'
import Posts from '../components/Posts'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'






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
      

        // const formdata = new FormData()
        // formdata.append('avatar', this.state.photoFile)

        // fetch(`http://localhost:3000/users/1`, {
        //     method: "PATCH",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: JSON.stringify({
        //         avatar: formdata
        //     })
        // }).then(resp => console.log(resp)
        // )
        
        
        this.props.editProfile(this.state)
        this.setState({editProfileClicked: !this.state.editProfileClicked})
    }

    // onChange = (e) => {
    //     this.setState({photoFile: e.currentTarget.files[0]})
    //     console.log(e.currentTarget.files[0]);
        
    // }
    // onChange = (e) => {
    //     console.log(e.target.files);
        
    // }


    

    render() {  

     let usersChapters

    if (this.props.chapters) {
        usersChapters = this.props.chapters.map((chapter) => {
            
            if (chapter.user.id === this.props.user.id) {
                return <ListGroup.Item as="li" >
                    <Posts handleUploadToChapters={this.props.handleUploadToChapters} handleFileAddedToChapters={this.props.handleFileAddedToChapters} editChapter={this.props.editChapter} deleteChapter={this.props.deleteChapter}key={chapter.id} handleClickedChapter={this.props.handleClickedChapter} {...chapter}/>
                    </ListGroup.Item >
            }
        }) 
    }   


    
   console.log(this.props.newUser);
   
    return (
        <div className="container">
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

      <Form onSubmit={this.handleSubmittedUpdateForm}>
        <Form.Control onChange={this.props.handleFileAdded} type="file" />
        <br></br>
        <button onClick={this.props.handleUpload}>Upload</button>
        <br></br>
        <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="first_name" name="first_name" value={this.state.first_name} onChange={this.handleChangeOnEdit} />
          <br></br>
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="last_name" name="last_name" value={this.state.last_name} onChange={this.handleChangeOnEdit} />
          <br></br>
          <Form.Label>Been There!</Form.Label>
          <Form.Control placeholder="locations_traveled" name="locations_traveled" value={this.state.locations_traveled} onChange={this.handleChangeOnEdit} />
          <br></br>
          <Form.Label>Bio</Form.Label>
          <Form.Control placeholder="bio" name="bio" value={this.state.bio} onChange={this.handleChangeOnEdit} />
          <br></br>
          <Form.Label>Email address</Form.Label>
          <Form.Control placeholder="email" name="email" value={this.state.email} onChange={this.handleChangeOnEdit} />
          <br></br>
          
          <br></br>
          <Form.Control className="originalButton" type="submit"/>
      </Form>
      </div>
      : 
      <div > 
      
      <ListGroup as="ul" className="float-right">
       { usersChapters}
      </ListGroup>
      <Card style={{ width: '18rem'}}>
          <Card.Img variant="top" src={this.props.user.url} />
          <Card.Body>
           <Card.Title>{this.props.user.first_name} {this.props.user.last_name}</Card.Title>
            <Card.Text>
                <Card.Title>Bio:</Card.Title>
            {this.props.user.bio}
            </Card.Text>
            <Card.Text>
            <Card.Title>Email:</Card.Title>

            {this.props.user.email}
            </Card.Text>
            <Card.Text>
            <Card.Title>Been there!</Card.Title>

            {this.props.user.locations_traveled}
            </Card.Text>
            <Button variant="dark" onClick={this.editProfileClicked}>Edit Profile</Button>
          </Card.Body>
            
            
            </Card>
      </div>
            
        }
        </div>
        </div>
        </div>
        
        )
    }
}

export default ProfilePage
