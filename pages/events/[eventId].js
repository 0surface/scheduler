import { Fragment } from 'react'
import { getFeaturedEvents, getEventById } from '../../api/api-methods'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

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
