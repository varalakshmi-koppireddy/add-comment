// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, deleteComment} = props
  const {name, comment, isLike, id, initialClassNames, date} = commentDetails
  const firstLetter = name[0].toUpperCase()
  const likeText = isLike ? 'like-icon-container' : 'button'

  const likeImgUrl = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const onClickLikeIcon = () => {
    toggleIsLike(id)
  }

  const onDeleteIcon = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-con">
      <div className="add-comment-container">
        <div className={initialClassNames}>
          <p className="letter">{firstLetter}</p>
        </div>
        <h1 className="name">{name}</h1>
        <p className="time">{postedTime} ago</p>
      </div>
      <p className="comment-description">{comment}</p>
      <div className="icons-container">
        <div className="like-text-container">
          <img src={likeImgUrl} className="like-icon" alt="like" />
          <button type="button" className={likeText} onClick={onClickLikeIcon}>
            Like
          </button>
        </div>

        <button
          type="button"
          className="delete-icon-container"
          onClick={onDeleteIcon}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
