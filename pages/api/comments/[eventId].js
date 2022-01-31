import { getAllDocuments, insertDocument } from '../../../helpers/db-util'
import { MongoClient } from 'mongodb'
const { MONGODB_URI } = process.env

async function handler(req, res) {
  const eventId = req.query.eventId

  const client = await MongoClient.connect(MONGODB_URI)

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' })
      return
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    }

    const db = client.db()

    const result = await insertDocument(client, 'comments', newComment)

    const newId = result.insertedId.toString()

    newComment.id = newId.split('"')[1]

    res.status(200).json({ message: 'Added comment', comment: newComment })
  }

  if (req.method === 'GET') {
    const db = client.db()

    const documents = await getAllDocuments(
      client,
      'comments',
      { _id: -1 },
      { eventId: eventId },
    )

    res.status(200).json({ comments: documents })
  }

  client.close()
}

export default handler
