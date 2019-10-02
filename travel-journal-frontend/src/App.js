import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from './containers/Header'
import HomePage from './containers/HomePage'
import ProfilePage from './containers/ProfilePage';
import AddStory from './components/AddStory';
import PostContainer from './containers/PostContainer';
import Map from './containers/Map'
import {storage} from './firebase'
import Album from './containers/Album';




class App extends React.Component {

  state = {
    user: {
      pins: [],
      chapters: [],
      pages: []
    },
    countries: [],
    chapters: [],
    newChapterCreated: false,
    currentBook: {
      pages: []
    },
    image: null,
    url: '',
    imageChapter: null,
    ulrChapter: '',
    newUser: false
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile', {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      }).then(resp => resp.json())
      .then( user => {this.setState({user})
    })
      
    }

    fetch('http://localhost:3000/chapters')
    .then(resp => resp.json())
    .then(chapters => this.setState({chapters})
    )
}

handleFileAddedToChapters = (e) => {

  if (e.target.files[0]) {
    this.setState({imageChapter: e.target.files[0]})
}
}

handleUploadToChapters = (e) => {
  e.preventDefault()

  const {imageChapter} = this.state
   
  if (imageChapter) {
    const uploadTask = storage.ref(`images/${imageChapter.name}`).put(imageChapter)
    uploadTask.on(`state_changed`, 
    () => {},
    () => {},
    () => {
        storage.ref('images').child(imageChapter.name).getDownloadURL().then(url => {
            this.setState({ulrChapter: url})
        })
        alert("Upload Successfull")
    })
  }else(alert("Please Choose a Photo First"))
  
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
            fetch(`http://localhost:3000/users/${this.state.user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            url: url
          })
  
        }).then(resp => resp.json())
          .then(data => this.setState({user: {...this.state.user, url: data.url }}))
          alert("Upload Successfull")
        })
    })
  }else(alert("Please Choose a Photo First"))
  
}

logUserIn = (userInfo) => {
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userInfo.username,
      password: userInfo.password
    })
  })
  .then(resp => resp.json())
  .then(data => this.data(data)
  )
  
}

data = (data) => {
  if (data.token) {
    localStorage.token = data.token

    fetch('http://localhost:3000/profile', {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    }).then(resp => resp.json())
    .then( user => {this.setState({user})
  })
      this.props.history.push('/profile')
  }else{alert("Invalid Username or Password")}
}


signUserUp = (userInfo) => {

  this.setState({newUser: true})
fetch('http://localhost:3000/signup', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: userInfo.username,
    password: userInfo.password
  })
})
  .then(resp => resp.json())
  .then(data => this.data(data)
  )

}

handleClickedChapter = (chapter) => {
this.setState({currentBook: chapter })
this.props.history.push('/view')


}

addStoryButton = () => {
  if (localStorage.token) {
    this.props.history.push('/addStory')
  }else{
    alert("Please Sing In")
  }
 
  
}

createNewChapter = (chapterInfo) => {
  fetch('http://localhost:3000/chapters', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: chapterInfo.location,
      date: chapterInfo.date,
      user_id: this.state.user.id,
      url: this.state.ulrChapter
    })
  }).then(resp => resp.json()
  )
  .then(data => {
    this.setState({newChapterCreated: !this.state.newChapterCreated, currentBook: data, chapters:[...this.state.chapters, data], 
      user: {...this.state.user, chapters: [...this.state.user.chapters, data]}})})
  
}

createNewPage = (pageInfo) => {
  
  fetch('http://localhost:3000/pages', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      title: pageInfo.title,
      content: pageInfo.content,
      date: pageInfo.date,
      user_id: this.state.user.id,
      chapter_id: this.state.currentBook.id,
      url: pageInfo.urlPage
    
    })
  }).then(resp => resp.json())
  .then(data => {
    this.setState({
      currentBook: {...this.state.currentBook, 
        pages: [...this.state.currentBook.pages,
          
          {id: data.id, title: data.title, date: data.date, content: data.content}]
      }
    })
    this.props.history.push('/view')
})
}


handleClickedChapterFromProfile = (chapterInfo) => {

  this.setState({newChapterCreated: !this.state.newChapterCreated, currentBook: chapterInfo})
  
}

editProfile = (editInfo) => {
fetch(`http://localhost:3000/users/${this.state.user.id}`, {
  method: "PATCH",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: editInfo.first_name,
    last_name: editInfo.last_name,
    locations_traveled: editInfo.locations_traveled,
    bio: editInfo.bio,
    email: editInfo.email
  })
}).then(resp => resp.json())
.then(info => this.setState({user: info})
)

}

clickedChapterOnViewPage = (chapter) => {
  const matchingChapter = this.state.chapters.find(chap => {
    return chap.id === chapter.id
  })
  this.setState({currentBook: matchingChapter })
  
  
}

deletePage = (pageInfo) => {
  fetch(`http://localhost:3000/pages/${pageInfo.id}`, {
    method: "DELETE"
  }).then(resp => resp.json())
  .then(page => {

      const leftoverPages = this.state.currentBook.pages.filter(pg => {
        return pg.id !== page.id
      })
      this.setState({currentBook: {...this.state.currentBook, pages: leftoverPages}})
  }
  )
}

deleteChapter = (chapter) => {
  console.log(chapter)


  fetch(`http://localhost:3000/chapters/${chapter.id}`, {
    method: "DELETE"
  })

  const leftoverUserChapters = this.state.user.chapters.filter(chap=> {    
    return chapter !== chap
  })

  this.setState({ user: {...this.state.user, chapters: leftoverUserChapters}})
  
}
  


// editChapter = (chapState, chapProps) => {
//   console.log(chapProps);
  
//   fetch(`http://localhost:3000/chapters/${chapProps.id}`, {
//     method: "PATCH",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       location: chapState.location,
//       date: chapState.date,
//       url: this.state.ulrChapter,
      
//     })
//   }).then(resp => resp.json())
//   .then(console.log
//   )
  
// }

updatePageStateAfterEdit = (pageInfo) => {
  console.log(pageInfo);
  
  const pageObjectWithOutChapterInfo = [{ url: pageInfo.url, content: pageInfo.content, date: pageInfo.date, id:  pageInfo.id, title: pageInfo.title, created_at: pageInfo.created_at}]
  console.log(pageObjectWithOutChapterInfo);

  // this.setState({currentBook: {...this.state.currentBook, pages: [...this.state.currentBook.pages, pageObjectWithOutChapterInfo]}})
  // this.setState({
  //   chapters: [this.state.chapter]
  // })
  
}


clearUser = () => {
  this.setState({user: {},currentBook: {pages: []}, newUser: false })
}



  render() {
 
  return (
    <Switch >
      <Route 
      exact path={'/'} 
      render={routerProps => <HomePage 
        countries={this.state.countries}
      user={this.state.user}
        clearUser={this.clearUser}
        addStoryButton={this.addStoryButton}
        user={this.state.user}
        logUserIn={this.logUserIn}
        signUserUp={this.signUserUp}
        {...routerProps}/>}
       />
       <Route 
      exact path={'/profile'} 
      render={routerProps => <ProfilePage
        newUser={this.state.newUser}
        handleUploadToChapters={this.handleUploadToChapters}
        handleFileAddedToChapters={this.handleFileAddedToChapters}
        editChapter={this.editChapter}
        url={this.state.url}
        image={this.state.image}
        handleUpload={this.handleUpload}
        handleFileAdded={this.handleFileAdded}
        clearUser={this.clearUser}
        editProfile ={this.editProfile}
        addStoryButton={this.addStoryButton}
        handleClickedChapter={this.handleClickedChapter}
        chapters={this.state.chapters}
        user={this.state.user}
         {...routerProps}/>}
       />
       <Route path={'/addStory'}
       render={routerProps => <AddStory
        editChapter={this.editChapter}
        handleUploadToChapters={this.handleUploadToChapters}
        handleFileAddedToChapters={this.handleFileAddedToChapters}
        clearUser={this.clearUser}
       currentBook={this.state.currentBook}
        handleClickedChapter={this.handleClickedChapterFromProfile}
       newChapterCreated={this.state.newChapterCreated}
       createNewPage={this.createNewPage}
        createNewChapter={this.createNewChapter}
        user={this.state.user}
        chapters={this.state.chapters}
         {...routerProps}/>}
       />

     <Route path={'/view'}
     render={routerProps => <PostContainer 
      handleUploadToChapters={this.handleUploadToChapters}
      handleFileAddedToChapters={this.handleFileAddedToChapters}
      editChapter={this.editChapter}
      deleteChapter={this.deleteChapter}
      clearUser={this.clearUser}
      updatePageStateAfterEdit={this.updatePageStateAfterEdit}
      deletePage={this.deletePage}
      clickedChapterOnViewPage={this.clickedChapterOnViewPage}
      user={this.state.user}
      addStoryButton={this.addStoryButton}
      currentBook={this.state.currentBook}
      chapters={this.state.chapters}
      {...routerProps}/>}
      /> 
      <Route path={'/map'}
      render={routerProps => <Map
        clearUser={this.clearUser}
      user={this.state.user}
      {...routerProps}
      />}
      />
      <Route path={'/album'}
      render={routerProps => <Album 
      {...routerProps}
      clearUser={this.clearUser}
      user={this.state.user}/>}/>
    </Switch>
  );
}
}



export default withRouter(App)
