import { useState, Fragment } from 'react'
import classes from './comment-list.module.css'

function CommentList(props) {
  const { comments } = props

  return (
    <Fragment>
      <ul className={classes.comments}>
        {/* Render list of comments - fetched from API */}
        {comments && comments.length > 0 ? (
          comments.map((item) => (
            <li key={item.id}>
              <p>{item.text}</p>
              <div>
                By <address>{item.name}</address>
              </div>
            </li>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
    </Fragment>
  )
}

export default CommentList
