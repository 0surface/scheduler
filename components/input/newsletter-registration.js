import { useRef, useState } from 'react'

import classes from './newsletter-registration.module.css'
import { ValidateEmail } from '../../helpers/helper-methods'

function NewsletterRegistration() {
  const inputNewsletter = useRef()
  const [emailIsValid, setEmailIsValid] = useState(true)

  function registrationHandler(event) {
    event.preventDefault()

    // fetch user input (state or refs)
    const inputEmail = inputNewsletter.current.value
    console.log('inputNewsletter.current.value', inputEmail)

    // optional: validate input
    const emailIsValid = ValidateEmail(inputEmail)
    console.log('emailIsValid::', emailIsValid)
    setEmailIsValid(emailIsValid)

    if (!emailIsValid) {
      console.log(`Invalid email : ${inputEmail}`)
      return
    }

    // send valid data to API
    const reqBody = { email: inputEmail }
    fetch(`/api/newsletter`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
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
            ref={inputNewsletter}
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
