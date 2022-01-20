import { Fragment } from 'react'

import { getFilteredEvents } from '../../api/api-methods'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/results-title'

function FiltredEventsPage(props) {
  if (props.hasError) {
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

  const { numYear, numMonth, filteredEvents, hasEvents } = props

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
  const { numYear, numMonth, isValid } = getSlugData(context.params.slug)

  if (!isValid) {
    return {
      props: {
        hasError: true,
      },
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      numYear,
      numMonth,
      filteredEvents,
      hasError: false,
      hasEvents: filteredEvents && filteredEvents.length > 0,
    },
  }
}
