import { Fragment } from 'react'

import { getFilteredEvents } from '../../api/api-methods'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/results-title'

function FiltredEventsPage(props) {
  const { slugIsValid, numYear, numMonth, filteredEvents, hasEvents } = props

  if (!slugIsValid) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  if (!hasEvents) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FiltredEventsPage

function getSlugData(filterData) {
  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  let isValid =
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
      ? false
      : true

  return { numYear, numMonth, isValid }
}

export async function getServerSideProps(context) {
  let filteredEvents = []
  let numYear
  let numMonth
  const slug = getSlugData(context.params.slug)
  const slugIsValid = slug && slug.isValid
  if (slugIsValid) {
    numYear = slug.numYear
    numMonth = slug.numMonth
  }

  if (slugIsValid) {
    filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    })
  }

  return {
    props: {
      slugIsValid,
      numYear,
      numMonth,
      filteredEvents,
      hasEvents: filteredEvents && filteredEvents.length > 0,
    },
  }
}
