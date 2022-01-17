import React from 'react'
import { useRouter } from 'next/router'
import { getFeaturedEvents } from '../data/dummy-data'
import EventList from '../components/events/EventList'

function HomePage(props) {
  const router = useRouter()
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}

export default HomePage
