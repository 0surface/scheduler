import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

import { transformEventData } from '../../api/api-methods'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/results-title'

function FiltredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_FIREBASE_API_URL}/events.json`,
    (url) => fetch(url).then((res) => res.json()),
  )
  console.log('data:', data)
  useEffect(() => {
    if (data) {
      const events = transformEventData(data)
      setLoadedEvents(events)
    }
  }, [data])

  if (!loadedEvents) {
    return <p className="center">Loading...</p>
  }

  const filterData = getSlugData(router.query.slug)

  if (error || !filterData.isValid) {
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

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === filterData.numYear &&
      eventDate.getMonth() === filterData.numMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(filterData.numYear, filterData.numMonth - 1)

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
