function NewsletterRegistrationHandler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: JSON.stringify('Invalid email address') })
      return
    }

    res.status(201).json({ success: true, email: JSON.stringify(email) })
  } else {
    res.status(200).json({ resgistrationStatus: true })
  }
}

export default NewsletterRegistrationHandler
