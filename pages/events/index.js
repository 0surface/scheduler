import React from 'react'
import { useRouter } from 'next/router'

function AllEventsPage(props) {
  const router = useRouter()
  return (
    <div>
      <h1>This is the Events Page</h1>
      <h3>All events are displayed here</h3>
      <h4>
        Router query = {JSON.stringify(router.query)} | Pathname ={' '}
        {JSON.stringify(router.pathname)}
      </h4>
    </div>
  )
}

export default AllEventsPage
