import { MongoClient } from 'mongodb'

const { MONGODB_URI } = process.env

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email adderss' })
      return
    }

    const newsletterUri = MONGODB_URI.replace('events', 'newsletter')

    const client = await MongoClient.connect(newsletterUri)

    const db = client.db()

    await db.collection('emails').insertOne({
      email: userEmail,
    })

    client.close()

    res.status(200).json({ message: 'Signed up' })
  }
}

export default handler
