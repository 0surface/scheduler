export function transformEventData(data) {
  const transformed = []
  for (const key in data) {
    transformed.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    })
  }

  return transformed
}

export function getFeaturedEvents(data) {
  return data.filter((event) => event.isFeatured)
}

export function getAllEvents() {
  return data
}

export function getFilteredEvents(data, dateFilter) {
  const { year, month } = dateFilter

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export function getEventById(data, id) {
  return data.find((event) => event.id === id)
}
