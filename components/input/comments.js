import { useState, useEffect } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [commentData, setCommentData] = useState([])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  useEffect(() => {
    fetch(`/api/comment/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        const comments = JSON.parse(data.comments)
        console.log('comment data fected::', comments)
        setCommentData(comments)
      })
  }, [eventId])

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('POST:response::', data))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={commentData} />}
    </section>
  )
}

export default Comments
