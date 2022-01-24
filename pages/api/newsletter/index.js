function NewsletterRegistrationHandler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email
    console.log('email at server side = ', email)
    res.status(201).json({ success: true, email: JSON.stringify(email) })
  } else {
    res.status(200).json({ resgistrationStatus: true })
  }
}

export default NewsletterRegistrationHandler
