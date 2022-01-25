import { transformCommentData } from '../../../api/api-methods'

const { FIREBASE_API_URL } = process.env
const COMMENTS_ENDPOINT = `${FIREBASE_API_URL}/comments.json`

async function getComments() {
  const callRsp = await fetch(COMMENTS_ENDPOINT)
  const data = await callRsp.json()
  const transformedData = transformCommentData(data)

  return transformedData
}

async function setComment(newComment) {
  const response = await fetch(COMMENTS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response) {
    return
  } else {
    throw error
  }
}

function validateCommentData(email, name, text) {
  let validation = { message: '', error: false }

  const message =
    !email || !email.includes('@')
      ? 'Invalid email address'
      : !name
      ? 'Invalid name value'
      : text.length > 500
      ? 'Comment length above allowed'
      : ''
  return { message, error: message.length > 0 }
}

function handler(req, res) {
  const eventId = req.query.eventId
  if (req.method === 'POST') {
    const { email, name, text } = req.body

    const validation = validateCommentData(email, name, text)
    if (validation.error) {
      res.status(422).json({ message: JSON.stringify(validation.message) })
      return
    }

    const newComment = {
      id: new Date().toISOString(),
      eventId,
      email,
      name,
      text,
    }

    try {
      setComment(newComment)

      res.status(201).json({
        message: 'comment received',
        comment: JSON.stringify(newComment),
      })
    } catch (error) {
      res.status(501).json({
        message: 'Firebase POST call failed',
        comment: JSON.stringify(newComment),
      })
    }
  } else if (req.method === 'GET') {
    try {
      getComments().then((comments) => {
        const commentsByEvent = comments.filter(
          (comment) => comment.eventId === eventId,
        )
        res.status(200).json({ comments: commentsByEvent })
      })
    } catch (error) {
      res.status(501).json({
        message: 'Firebase GET call failed',
        comments: [],
      })
    }
  } else {
    res.status(200).json({ status: 'success' })
  }
}

export default handler
