import { useRouter } from 'next/router'
import { getAllEvents } from '../../api/api-methods'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'

function AllEventsPage(props) {
  const router = useRouter()

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.allEvents} />
    </div>
  )
}

export default AllEventsPage

export async function getServerSideProps(context) {
  const allEvents = await getAllEvents()

  return {
    props: {
      allEvents,
      hasEvents: allEvents && allEvents.length > 0,
    },
  }
}
