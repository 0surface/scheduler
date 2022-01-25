import { useRef, useState } from 'react'

import classes from './newsletter-registration.module.css'
import { ValidateEmail } from '../../helpers/helper-methods'

function NewsletterRegistration() {
  const userEmail = useRef()
  const [emailIsValid, setEmailIsValid] = useState(true)

  function registrationHandler(event) {
    event.preventDefault()

    // fetch user input (state or refs)
    const inputEmail = userEmail.current.value

    // optional: validate input
    const emailIsValid = ValidateEmail(inputEmail)

    setEmailIsValid(emailIsValid)

    if (!emailIsValid) {
      return
    }

    // send valid data to API
    const reqBody = { email: inputEmail }
    fetch(`/api/newsletter`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>
        console.log(
          'Email Registration::',
          data,
          data.success ? 'success' : 'failure',
        ),
      )
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={userEmail}
          />

          <button onClick={registrationHandler}>Register</button>
        </div>
        {!emailIsValid && (
          <>
            <p className="color:red">Invalid Email</p>
          </>
        )}
      </form>
    </section>
  )
}

export default NewsletterRegistration
