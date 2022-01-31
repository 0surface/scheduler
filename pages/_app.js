import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout/layout'
import Notification from '../components/ui/notification'
import { NotificationContextProvider } from '../store/notification-context'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Scheduler</title>
          <meta name="description" content="NextJs Scheduler" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
