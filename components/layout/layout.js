import { Fragment } from 'react'
import MainHeader from './main-header'

function layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default layout
