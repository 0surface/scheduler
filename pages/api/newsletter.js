import { connectDatabase, insertDocument } from '../../helpers/db-util'

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email adderss' })
      return
    }

    let client

    try {
      client = await connectDatabase('newsletter')
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed' })
      return
    }

    try {
      await insertDocument(client, 'emails', { email: userEmail })
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' })
      return
    }

    client.close()

    res.status(200).json({ message: 'Signed up' })
  }
}

export default handler
