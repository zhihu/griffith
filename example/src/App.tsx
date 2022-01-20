import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import FMP4Page from './FMP4Page'
import HLSPage from './HLSPage'
import IframePage from './IframePage'
import InlinePage from './InlinePage'
import MP4Page from './MP4Page'

const nonav = new URLSearchParams(location.search).has('nonav')

const NavLinks = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/mp4">/mp4</Link>
          <br />
          <Link to="/mp4?logo">/mp4?logo</Link>
          <br />
          <Link to="/mp4?loop">/mp4?loop</Link>
          <br />
        </li>
        <li>
          <Link to="/mp4-mse">/mp4-mse</Link>
        </li>
        <li>
          <Link to="/hls">/hls</Link>
          <br />
          <Link to="/hls?autoplay">/hls?autoplay</Link>
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
        <Route path="/mp4-mse">
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
