import React, { Component } from 'react'
import Header from './Header';

class Album extends Component {
    render() {
        console.log(this.props.user);
        
        const chapterImgs = this.props.user.chapters.map(chapter => {
            return <img src={chapter.url}/>
        })

        const pageImgs = this.props.user.pages.map(page => {
            return <img src={page.url}/>
        })
        return (
            <div>
                <Header user={this.props.user}/>
            <div>
                {chapterImgs}
                {pageImgs}
            </div>
            </div>
        )
    }
}

export default Album
