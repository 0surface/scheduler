import React from 'react'
import { useRouter } from 'next/router'
import { getFeaturedEvents } from '../api/api-methods'
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
  const featured = await getFeaturedEvents()
  return {
    props: {
      featuredEvents: featured,
    },
    revalidate: 10,
  }
}
