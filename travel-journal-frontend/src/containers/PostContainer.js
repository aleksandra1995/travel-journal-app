import React, { Component } from 'react'
import Posts from '../components/Posts'
import Header from './Header';
import Page from '../components/Page';
import {storage} from '../firebase'





class PostContainer extends Component {
    
   state = {
       bookClicked: 0,
       xCoordinates: 0,
       editPageClicked: false,
       title: "",
       date: "",
       content: "",
       currentPage: {},
       image: null,
       url: ''
   }

   setCoordinates = (e) => {
    this.setState({
      xCoordinates: e.screenX
    }) 
   }

   flipPage = () => {
     if (this.state.xCoordinates < 300 ) {
        this.setState({
           bookClicked: this.state.bookClicked - 1
       })
     } else if (this.state.xCoordinates > 400 ) { 
        this.setState({
           bookClicked: this.state.bookClicked + 1
       })
     }
   }

   clickedChapterOnViewPage = (chapter) => {
    this.props.clickedChapterOnViewPage(chapter)
    this.setState({bookClicked: 0})
   }

   editPage = (pageInfo) => {
    this.setState({editPageClicked: !this.state.editPageClicked, currentPage: pageInfo})
  
    
  }

  handleOnChangePageEdit = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleSubmittedEditPage = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/pages/${this.state.currentPage.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        content: this.state.content,
        title: this.state.title,
        date: this.state.date,
        url: this.state.url
      })
    }).then(resp => resp.json())
    .then(page => {
      this.setState({editPageClicked: !this.state.editPageClicked})
      this.props.updatePageStateAfterEdit(page)
    }
    )
    }

    handleFileAdded = (e) => {
  
  
      if (e.target.files[0]) {
          this.setState({image: e.target.files[0]})
      }
    }
    
    handleUpload = (e) => {
      e.preventDefault()
      const {image} = this.state
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(`state_changed`, 
      () => {},
      () => {},
      () => {
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
              this.setState({url})
              fetch(`http://localhost:3000/pages/${this.state.currentPage.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              url: url
            })
    
          }).then(resp => resp.json())
            .then(console.log
            )
              
          })
      })
      
    }

 
 
  
  

    render() {
  
      const orderedPages = this.props.currentBook.pages.sort((a,b) => {
        return a.id - b.id
      })
      
       let indPage = orderedPages.slice(this.state.bookClicked, this.state.bookClicked + 1)



        const pages = indPage.map(page => {
            return <Page currentPage={this.state.currentPage}editPage = {this.editPage} deletePage = {this.props.deletePage} key={page.id} {...page} />
            
        })
        let chapters
        if (this.props.user.chapters) {
           chapters = this.props.user.chapters.map(chapter => {
            return <li 
            onClick={() => this.clickedChapterOnViewPage(chapter)} className="indChap">
  
              {chapter.location}
              {chapter.date}
              <button className="headeroriginalButton" onClick={() => this.props.deleteChapter(chapter)}>Delete</button>
              {/* <button>Edit</button> */}

            </li>
            
          })
        }

        return (
    <div>
            
                <Header 
                user={this.props.user}
                clearUser={this.props.clearUser} addStoryButton={this.props.addStoryButton}/>
      <div class="container">
        <div className="listedChapters">
        Chapters:
      <ul >
      {chapters}
      </ul>

        </div>

        <div class="book-wrapper">
          <div class="book-cover">
            <img src="https://github.com/slyka85/assets/blob/master/bookcover2.png?raw=true" alt=""/>
          </div>
            <div onMouseMove={this.setCoordinates} onClick={this.flipPage} class="pages-container">
              <div class="pages">

            </div>
              <div className="leftPage">
          <div class="pages-content">
            <div className="chapterInfo">
            <h3>
            {this.props.currentBook.location}
            </h3>
              <h3>
                  {this.props.currentBook.date}
              </h3>
              <img className="chapImg" src={this.props.currentBook.url}/>
            </div>
            
              
            <div class="content-inner">
            {this.state.editPageClicked ?

            <form onSubmit={this.handleSubmittedEditPage}>
              <input onChange={this.handleFileAdded} type="file" />
              <button onClick={this.handleUpload}>Upload</button>
              <input type="text" name="title" value={this.state.title} onChange={this.handleOnChangePageEdit} placeholder="title" />
              <br></br>
              <input type="text" name="date" value={this.state.date} onChange={this.handleOnChangePageEdit} placeholder="date" />
              <br></br>
              <input type="text" name="content" value={this.state.content} onChange={this.handleOnChangePageEdit} placeholder="content" />
              <br></br>
              <input type="submit" />
            </form>
            :
            
              pages
            }
            </div>
          </div>

        </div>
      </div>
    </div>
  


</div>
             
               
            </div>
        )
    }
}




export default PostContainer
