import React, { Component } from 'react'

class Page extends Component {

    handleEdit = (e) => {
        e.stopPropagation()
        this.props.editPage(this.props)
    }

    handleDelete = (e) => {
        e.stopPropagation()
        this.props.deletePage(this.props)
    }

    render() {

        return (
            <div className="indPageContent">
                <img src={this.props.url}/>
                <h1 className="title">{this.props.title}</h1>
              <p>{this.props.content}</p>
              <button onClick={this.handleEdit} className="onPageButton">Edit</button>
              <button onClick={this.handleDelete} className="onPageButton">Delete</button>

            </div>
        )
    }
}

export default Page
