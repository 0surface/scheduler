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

    const result = await db.collection('comments').insertOne(newComment)

    const newId = result.insertedId.toString()

    newComment.id = newId.split('"')[1]

    res.status(200).json({ message: 'Added comment', comment: newComment })
  }

  if (req.method === 'GET') {
    const dummy_Data = [
      { id: 'c1', name: 'Max', text: 'this is my first comment' },
      { id: 'c2', name: 'Manchester', text: 'this is my second comment' },
    ]

    res.status(200).json({ comments: dummy_Data })
  }

  client.close()
}

export default handler
