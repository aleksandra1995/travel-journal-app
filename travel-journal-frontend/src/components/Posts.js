import React, { Component } from 'react'

class Posts extends Component {
    state = {
        chapterEditClicked: false,
        location: "",
        date: ''
    }

    chapterEditClicked = (e) => {
        this.setState({
            chapterEditClicked: !this.state.chapterEditClicked
        })


    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        this.props.editChapter(this.state, this.props)
        this.setState({chapterEditClicked: !this.state.chapterEditClicked})
    }

    render() {

        return (
            <div onClick={() => this.props.handleClickedChapter(this.props)} className="pageCard">
            {this.state.chapterEditClicked ?
            <div>
            <form onSubmit={this.handleOnSubmit}>
                <input placeholder="location" type="text" name="location" value={this.state.location} onChange={this.handleOnChange} />
                <input placeholder="date" type="text" name="date" value={this.state.date} onChange={this.handleOnChange} />
                <input type="submit"/>
                <input onChange={this.props.handleFileAddedToChapters} type="file" />
                <button onClick={this.props.handleUploadToChapters}>Upload</button>

            </form>
            </div>
            :
            <div >
               {this.props.location} {this.props.date}
            </div>
            }

            </div>
        )
    }



}

export default Posts
