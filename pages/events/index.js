import { useRouter } from 'next/router'
import { getAllEvents } from '../../api/api-methods'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'

function AllEventsPage(props) {
  const { events } = props
  const router = useRouter()

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  )
}

export default AllEventsPage

export async function getStaticProps(context) {
  const events = await getAllEvents()

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}
