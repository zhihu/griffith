import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import MP4Page from './MP4Page'
import FMP4Page from './FMP4Page'
import HLSPage from './HLSPage'
import InlinePage from './InlinePage'
import IframePage from './IframePage'

const nonav = new URLSearchParams(location.search).has('nonav')

const NavLinks = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/mp4">mp4</Link>{' '}
          <Link to="/mp4?logo">mp4 (with logo) </Link>{' '}
          <Link to="/mp4?loop">mp4 (loop)</Link>
        </li>
        <li>
          <Link to="/fmp4">mp4 (MSE)</Link>
        </li>
        <li>
          <Link to="/hls">hls (MSE)</Link>
        </li>
        <li>
          <Link to="/inline">inline</Link>
        </li>
        <li>
          <Link to="/iframe">iframe</Link>
        </li>
      </ul>
    </nav>
  )
}

function App() {
  return (
    <Router>
      {!nonav && <NavLinks />}

      <Switch>
        <Route path="/mp4">
          <MP4Page />
        </Route>
        <Route path="/fmp4">
          <FMP4Page />
        </Route>
        <Route path="/hls">
          <HLSPage />
        </Route>
        <Route path="/inline">
          <InlinePage />
        </Route>
        <Route path="/iframe">
          <IframePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
