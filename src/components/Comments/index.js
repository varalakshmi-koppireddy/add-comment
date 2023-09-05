import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLike: !eachComment.isLike}
        }
        return eachComment
      }),
    }))
  }

  renderCommentList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLike={this.toggleIsLike}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLike: false,
      initialClassNames: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="comments-container">
          <h1 className="main-heading">Comments</h1>
          <div className="top-section">
            <form
              className="comment-form-container"
              onSubmit={this.onAddComment}
            >
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="input"
                value={name}
                onChange={this.onChangeName}
                placeholder="Your Name"
              />
              <br />
              <textarea
                rows="8"
                cols="28"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image"
              alt="comments"
            />
          </div>
          <hr />
          <div className="count-comments-container">
            <div className="comments-count">
              <p className="count">{commentsList.length}</p>
            </div>
            <p className="comments-text">Comments</p>
          </div>
          <ul className="comments-list-container">
            {this.renderCommentList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
