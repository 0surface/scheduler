import { useState, useEffect, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props
  const notificationCtx = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentsStatus, setCommentsStatus] = useState('Loading comments...')

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          setLoadingComments(true)
          setTimeout(() => {
            setLoadingComments(false)
          }, 3000)

          return response.json()
        })
        .then((data) => {
          setComments(data.comments)
          setLoadingComments(false)
        })
    }
  }, [showComments, eventId])

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Saving Comments...',
      message: 'Adding comments',
      status: 'pending',
    })

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        console.log('ui:data::', data)
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Added comment successfully',
          status: 'success',
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error',
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {loadingComments && <p>{commentsStatus}</p>}
      {showComments && !loadingComments && <CommentList items={comments} />}
    </section>
  )
}

export default Comments
