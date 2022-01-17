import React from 'react'
import EventItem from './EventItem'

function EventList(props) {
  const { items } = props
  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.Id} />
      ))}
    </ul>
  )
}

export default EventList
