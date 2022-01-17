import { useRouter } from 'next/router'
import { getAllEvents } from '../../data/dummy-data'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'

function AllEventsPage(props) {
  const router = useRouter()
  const events = getAllEvents()

  return (
    <div>
      <EventsSearch />
      <EventList items={events} />
    </div>
  )
}

export default AllEventsPage
