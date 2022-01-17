import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function EventItem(props) {
  const { title, image, date, location, id } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedAddress = location.replace(',', '\n')
  const exploreLink = `/events/${id}`

  return (
    <li>
      <Image src={'/' + image} alt={title} width={400} height={400} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Expolre Event</Link>
        </div>
      </div>
    </li>
  )
}

export default EventItem
