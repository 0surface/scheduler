function handler(req, res) {
  const eventId = req.query.eventId

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

    res.status(200).json({ message: 'Added comment', comment: newComment })
  }

  if (req.method === 'GET') {
    const dummy_Data = [
      { id: 'c1', name: 'Max', text: 'this is my first comment' },
      { id: 'c2', name: 'Manchester', text: 'this is my second comment' },
    ]

    res.status(200).json({ comments: dummy_Data })
  }
}

export default handler
