function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email adderss' })
      return
    }

    res.status(200).json({ message: 'Signed up' })
  }
}

export default handler
