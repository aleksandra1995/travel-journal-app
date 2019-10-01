import React, { Component } from 'react'
import Posts from '../components/Posts'
import Header from '../containers/Header'


class NewPageForm extends Component {

    state = {
        location: '',
        date: '',
        title: '',
        content: ''
    }

    handleOnChange= (e) => {
     this.setState({[e.target.name]: e.target.value})
    }

   
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.props.createNewChapter(this.state)
    }

    handleFormSubmitForPage = (e) => {
        e.preventDefault()
        this.props.createNewPage(this.state)
    }
    
    render() {
        let usersChapters
        if (this.props.chapters) {
            usersChapters = this.props.chapters.map((chapter) => {
                console.log(chapter.user.id);
                
                if (chapter.user.id === this.props.user.id) {
                    return <li className="listedChapters">
                        <Posts handleUploadToChapters={this.props.handleUploadToChapters} handleFileAddedToChapters={this.props.handleFileAddedToChapters} editChapter={this.props.editChapter} deleteChapter={this.props.deleteChapter}key={chapter.id} handleClickedChapter={this.props.handleClickedChapter} editChapter={this.props.editChapter} deleteChapter={this.props.deleteChapter}handleClickedChapter={this.props.handleClickedChapter} {...chapter}/>
                    </li> 
                }
            }) 
        }   
      
        

        return (
            <div>
            
                <Header 
                user={this.props.user}
            clearUser={this.props.clearUser}

                 />
                
               
                <div class="container">
                <div > 
                
                 <form className="editProfile" onSubmit={this.handleFormSubmit}>
                     <strong className="text">

                     "Create a new chapter"
                     </strong>
                     <br></br>
                    <input onChange={this.props.handleFileAddedToChapters} type="file" />
                    <br></br>
                    <button onClick={this.props.handleUploadToChapters}>Upload</button>
                    <br></br>
                    <input value={this.state.location} onChange={this.handleOnChange} name="location" placeholder="location" type="text" />
                    <br></br>
                    <input value={this.state.date} onChange={this.handleOnChange} name='date' placeholder="date" type="text" />
                    <br></br>
                    <input type="submit" />

                </form>
                <ul>
                {usersChapters}
                </ul>
                    </div>
                <div class="book-wrapper">
                  <div class="book-cover">
                    <img src="https://github.com/slyka85/assets/blob/master/bookcover2.png?raw=true" alt=""/>
                  </div>
                  <div class="pages-container">
                    <div class="pages">
                      </div>
                      <div class="page-num-4">
                        <div class="pages-content">
                        <div className="addPage"> 
                                <h1>
                                {this.props.currentBook.location}
                                </h1>  
                                <h1>
                                {this.props.currentBook.date}
                                </h1> 
                                <img src={this.props.currentBook.url}/>
                              </div>
                          <div class="content-inner2">
                              
                          { this.props.currentBook.location? <form className="newPage"onSubmit={this.handleFormSubmitForPage}>
                <input value={this.state.title} onChange={this.handleOnChange} name="title" placeholder="title" type="text" />
                <br></br>
                <input value={this.state.date} onChange={this.handleOnChange} name='date' placeholder="date" type="text" />
                <br></br>
                <input value={this.state.content} onChange={this.handleOnChange} name='content' placeholder="content" type="text" />
                <br></br>
                <input type="submit" />
          </form> : <h1>Please Choose a Chapter</h1>}
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

export default NewPageForm
