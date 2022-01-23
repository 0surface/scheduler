import Head from 'next/head'
import { getFeaturedEvents } from '../api/api-methods'
import EventList from '../components/events/EventList'
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Scheduler</title>
        <meta
          name="description"
          content="Schedule and find all your essential events in one place"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  )
}

export default HomePage

export async function getStaticProps() {
  const featured = await getFeaturedEvents()
  return {
    props: {
      featuredEvents: featured,
    },
    revalidate: 1800,
  }
}
