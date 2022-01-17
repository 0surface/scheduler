import React from 'react'
import { useRouter } from 'next/router'

function EventDetailPage(props) {
  const router = useRouter()
  return (
    <div>
      <h1>This is the Event Detail Page</h1>
      <h3>A Selected Event is displayed here</h3>
      <h4>
        Router query = {JSON.stringify(router.query)} | Pathname ={' '}
        {JSON.stringify(router.pathname)}
      </h4>
    </div>
  )
}

export default EventDetailPage
