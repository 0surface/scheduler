function handler(req, res) {
  if (req.method === 'POST') {
    const eventId = req.query.eventId
    console.log('POST:eventId::', eventId, req.query)

    const reqBody = req.reqBody
    const email = req.body.email
    const text = req.body.text
    const name = req.body.name

    console.log('POST:reqBody::', req.body)

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }

    res.status(201).json({
      message: 'comment received',
      comment: JSON.stringify(newComment),
    })
  } else if (req.method === 'GET') {
    const dummyData = [
      {
        id: 1,
        email: 'hithere@test.com',
        name: 'James',
        text: 'this is a good article, i liked it.',
      },
      {
        id: 2,
        email: 'zho01@test.com',
        name: 'Zaho',
        text: 'Some of the concepts in this news letter are advanced',
      },
      {
        id: 3,
        email: 'more@test.com',
        name: 'Bolder',
        text: 'This was useful, thank you. When can we expect the next iteration?',
      },
    ]
    res.status(200).json({ comments: JSON.stringify(dummyData) })
  } else {
    res.status(200).json({ status: 'success' })
  }
}

export default handler
