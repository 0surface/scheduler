import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../data/dummy-data'
import EventList from '../../components/events/EventList'

function FiltredEventsPage(props) {
  const router = useRouter()
  const filterDate = { ...router.query.slug }
  const { 0: year, 1: month } = filterDate
  // const month = router.query.slug[1]
  // const filter = new Array ()[2021, 05]
  const filteredEvents = getFilteredEvents(filterDate)

  return (
    <div>
      <h5>{console.log(filterDate, filteredEvents)}</h5>
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FiltredEventsPage
