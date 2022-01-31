import {
  getAllDocuments,
  insertDocument,
  connectDatabase,
} from '../../../helpers/db-util'

async function handler(req, res) {
  const eventId = req.query.eventId
  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed' })
    return
  }

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
      client.close()
      return
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    }

    try {
      const result = await insertDocument(client, 'comments', newComment)

      const newId = result.insertedId.toString()

      newComment.id = newId.split('"')[1]

      res.status(200).json({ message: 'Added comment', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting comments failed' })
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId },
      )
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ message: 'Fetching data from database failed' })
    }
  }

  client.close()
}

export default handler
