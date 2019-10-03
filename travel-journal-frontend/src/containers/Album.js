import React, { Component } from 'react'
import Header from './Header';
import {storage} from '../firebase'


class Album extends Component {

    state = {
        addFileClicked: false,
        image: null,
        url: '',
        fileName: '',
        albums: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/albums')
        .then(resp => resp.json())
        .then(albums => this.setState({albums}) )
    }
    
    addFile = (e) => {
        console.log(e.target.name);
    }

    handleFileAdded = (e) => {
  
  
        if (e.target.files[0]) {
            this.setState({image: e.target.files[0]})
        }
      }
      
      handleUpload = (e) => {
        e.preventDefault()
        const {image} = this.state
      
        if (image) {
          const uploadTask = storage.ref(`images/${image.name}`).put(image)
          uploadTask.on(`state_changed`, 
          () => {},
          () => {},
          () => {
            
              storage.ref('images').child(image.name).getDownloadURL().then(url => {
                  this.setState({url})
            
              fetch('http://localhost:3000/albums', {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                user_id: this.props.user.id,
                url: this.state.url,
                name: this.state.fileName
            })
        }).then(resp => resp.json())
        .then(album => this.setState({albums: [...this.state.albums, album]}))
                alert("Upload Successfull")
              })
          })
        }else(alert("Please Choose a Photo First"))
        
        this.setState({addFileClicked: false})
      }

      addFileClicked = (e) => {
          this.setState({addFileClicked: true, fileName: e.target.name})
      }
    render() {

        const albumFiles = this.state.albums.map(album => {
            if (this.props.user.id === album.user.id) {
                if (album.name === "photo") {
                    return <img className="album-pics"  src={album.url}/>
                }else if (album.name === "video") {
                    return <video className="album-pics" src={album.url} controls />   
                }
            }
            
        })

        const chapterImgs = this.props.user.chapters.map(chapter => {
            return <img className="album-pics"  src={chapter.url}/>
        })

        const pageImgs = this.props.user.pages.map(page => {
            return <img className="album-pics" src={page.url}/>
        })
        return (
            <div>
                <Header clearUser={this.props.clearUser} user={this.props.user}/>
                <button onClick={this.addFileClicked} name="video" className="originalButton">Add video</button>
                <button onClick={this.addFileClicked} name="photo" className="originalButton">Add photo</button>

            <div>
                {this.state.addFileClicked ?
                <div>
                    <input onChange={this.handleFileAdded} type="file" />
                    <br></br>
                    <button onClick={this.handleUpload}>Upload</button>
                </div>
                : <p>
                    {chapterImgs} {pageImgs} {albumFiles}
                </p>  }
            </div>
            </div>
        )
    }
}

export default Album
