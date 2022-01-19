const { FIREBASE_API_URL } = process.env
const FIREBASE_API_EVENTS_URL = `${FIREBASE_API_URL}/events.json` ///process.env

export function transformEventData(data) {
  const transformed = []
  for (const key in data) {
    transformed.push({
      id: key,
      ...data[key],
    })
  }

  return transformed
}

export async function getFeaturedEvents() {
  const events = await getAllEvents()
  return events.filter((event) => event.isFeatured)
}

export async function getAllEvents() {
  const response = await fetch(FIREBASE_API_EVENTS_URL)
  const data = await response.json()
  return transformEventData(data)
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter
  const data = await getAllEvents()

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export async function getEventById(id) {
  const data = await getAllEvents()
  return data.find((event) => event.id === id)
}
