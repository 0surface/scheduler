import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../data/dummy-data'
import EventList from '../../components/events/EventList'

function FiltredEventsPage(props) {
  const router = useRouter()
  const filterData = router.query.slug

  if (!filterData) {
    return <p className="center">Loading ...</p>
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid Filter. Please adjust your values.</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })
  if (!filteredEvents | (filteredEvents.length === 0)) {
    return <p>No Events found for the chosen filter!</p>
  }

  return (
    <div>
      <h5>{console.log(filterData, filteredEvents)}</h5>
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FiltredEventsPage
