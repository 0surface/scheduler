import { Fragment } from 'react'
import { getAllEvents, getEventById } from '../../api/api-methods'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

function EventDetailPage(props) {
  const { event } = props

  if (!props.event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
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
  const data = await getAllEvents()

  const pathsWithPrams = data.map((event) => ({
    params: { eventId: event.id },
  }))

  return {
    paths: pathsWithPrams,
    fallback: false,
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
  }
}
