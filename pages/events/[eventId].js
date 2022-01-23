import { Fragment } from 'react'
import Head from 'next/head'
import { getFeaturedEvents, getEventById } from '../../api/api-methods'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'
import Comments from '../../components/input/comments'

function EventDetailPage(props) {
  const { event } = props

  if (!props.event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description}></meta>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  )
}

export default EventDetailPage

export async function getStaticPaths() {
  const data = await getFeaturedEvents()

  const pathsWithPrams = data.map((event) => ({
    params: { eventId: event.id },
  }))

  return {
    paths: pathsWithPrams,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const eventId = params.eventId
  const event = await getEventById(eventId)

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  }
}
