import React from 'react'
import { useRouter } from 'next/router'
import { getFeaturedEvents, transformEventData } from '../api/api-methods'
import EventList from '../components/events/EventList'

function HomePage(props) {
  const router = useRouter()

  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  )
}

export default HomePage

export async function getStaticProps() {
  const { FIREBASE_API_URL } = process.env
  const response = await fetch(`${FIREBASE_API_URL}/events.json`)
  const data = await response.json()
  const featured = getFeaturedEvents(transformEventData(data))

  return {
    props: {
      featuredEvents: featured,
    },
    revalidate: 10,
  }
}
