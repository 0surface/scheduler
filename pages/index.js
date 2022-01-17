import React from 'react'
import { useRouter } from 'next/router'

function HomePage(props) {
  const router = useRouter()
  return (
    <div>
      <h1>This is the Starting page</h1>
      <h3>Featured events are displayed here</h3>
      <h4>
        Router query = {JSON.stringify(router.query)} | Pathname ={' '}
        {JSON.stringify(router.pathname)}
      </h4>
    </div>
  )
}

export default HomePage
